import axios from 'axios';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

function getRuleBasedRecommendation(formData) {
  const { highestQualification, yearsExperience, careerGoal } = formData;
  const exp = yearsExperience || 0;
  const goal = careerGoal.toLowerCase();

  if (exp >= 20 || (exp >= 15 && (goal.includes('ceo') || goal.includes('founder') || goal.includes('director')))) {
    return 'Honorary Doctorate';
  }

  if ((highestQualification === 'Master' || highestQualification === 'PhD') && 
      (exp >= 5 || goal.includes('research') || goal.includes('academic') || goal.includes('teach'))) {
    return 'PhD';
  }

  if (highestQualification === 'Master' && exp >= 5 && 
      (goal.includes('management') || goal.includes('leadership') || goal.includes('executive') || goal.includes('consult'))) {
    return 'DBA';
  }

  if (highestQualification === 'Bachelor' && exp >= 8 && 
      (goal.includes('management') || goal.includes('director') || goal.includes('lead'))) {
    return 'DBA';
  }

  if (exp < 5 || highestQualification === 'High School' || highestQualification === 'Bachelor' || 
      goal.includes('learn') || goal.includes('skill') || goal.includes('certification')) {
    return 'Certification Program';
  }

  return 'Certification Program';
}

async function getGroqRecommendation(formData) {
  const { highestQualification, yearsExperience, currentProfession, careerGoal } = formData;

  const prompt = `Based on the following academic/professional profile, recommend exactly ONE of these four academic pathways: "Certification Program", "DBA", "PhD", "Honorary Doctorate". Only respond with the name of the recommendation, nothing else.

Profile:
- Highest Qualification: ${highestQualification}
- Years of Work Experience: ${yearsExperience}
- Current Profession: ${currentProfession}
- Career Goal: ${careerGoal}

Recommendation:`;

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are an academic pathway advisor. Recommend only from: Certification Program, DBA, PhD, Honorary Doctorate. Respond with a single recommendation name, no extra text.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 20
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000 
      }
    );

    let recommendation = response.data.choices[0]?.message?.content?.trim();
    const validRecommendations = ['Certification Program', 'DBA', 'PhD', 'Honorary Doctorate'];
    if (recommendation && validRecommendations.includes(recommendation)) {
      return recommendation;
    } else {
      console.warn('Groq returned invalid recommendation:', recommendation);
      return null; 
    }
  } catch (error) {
    console.error('Groq API error:', error.message);
    return null; 
  }
}

export async function getRecommendation(formData) {
  const groqResult = await getGroqRecommendation(formData);
  if (groqResult) {
    return groqResult;
  }

  console.log('Falling back to rule-based recommendation');
  return getRuleBasedRecommendation(formData);
}