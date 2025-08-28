import fetch from "node-fetch";

// Comprehensive gold investment knowledge base
const goldInvestmentKB = [
  {
    q: "what is sovereign gold bond",
    a: "Sovereign Gold Bonds (SGBs) are government securities denominated in grams of gold. They're issued by RBI on behalf of Government of India. Each unit equals 1 gram of gold. You get 2.5% annual interest plus capital appreciation linked to gold prices. It's the smartest way to invest in gold without storage hassles.",
    category: "basics",
    keywords: ["sovereign", "gold", "bond", "sgb", "government", "security"]
  },
  {
    q: "benefits of gold bonds vs physical gold",
    a: "SGBs beat physical gold hands down. You get 2.5% annual interest (physical gives zero), no storage costs, no purity concerns, easy liquidity on exchanges after 5 years, and capital gains tax exemption if held till maturity (8 years). Plus, you can use them as collateral for loans.",
    category: "comparison",
    keywords: ["benefits", "advantages", "physical", "vs", "comparison"]
  },
  {
    q: "how to buy gold bond",
    a: "SGBs are issued in tranches throughout the year. You can buy through banks, post offices, or online platforms during issue periods. Minimum 1 gram, maximum 4kg per person annually. Price is set based on previous 3 days' average gold prices with ₹50/gram discount. After listing, trade on NSE/BSE.",
    category: "buying",
    keywords: ["buy", "purchase", "how", "where", "tranche", "issue"]
  },
  {
    q: "gold investment risks",
    a: "Gold has its risks - price volatility (can swing 10-20% annually), no regular income from physical gold, currency risk if global factors dominate, and opportunity cost versus equity returns. However, it's excellent portfolio diversifier and inflation hedge. I typically recommend 5-10% portfolio allocation.",
    category: "risks",
    keywords: ["risk", "volatile", "volatility", "danger", "problem"]
  },
  {
    q: "gold price factors",
    a: "Gold moves on multiple factors: USD strength (inverse relationship), inflation expectations, central bank policies, geopolitical tensions, and demand from India/China. Recent trends show gold performing well during economic uncertainty. I watch DXY, real yields, and Fed policy closely.",
    category: "market",
    keywords: ["price", "factors", "market", "trend", "analysis", "movement"]
  },
  {
    q: "gold vs equity returns",
    a: "Long-term, equity outperforms gold significantly. Last 20 years: Sensex ~12% CAGR vs Gold ~8% CAGR. But gold shines during equity crashes - 2008, 2020 examples. Smart allocation: 70-80% equity, 10-15% gold, rest debt. Gold is insurance, not growth driver.",
    category: "returns",
    keywords: ["returns", "equity", "stock", "performance", "comparison", "allocation"]
  },
  {
    q: "best time to buy gold",
    a: "I use SIP approach for gold - regular monthly investments smooth out volatility. Tactically, buy during monsoon season (July-Sep) when rural demand is low, and avoid wedding/festival seasons when premiums spike. Dollar cost averaging works best.",
    category: "timing",
    keywords: ["when", "timing", "best", "time", "season", "buy"]
  },
  {
    q: "gold etf vs gold bonds",
    a: "Both are paper gold, but SGBs win on multiple fronts: 2.5% annual interest (ETFs give none), tax efficiency (LTCG exempt on maturity), no expense ratio (ETFs charge 0.5-1%), and government backing. ETFs offer better liquidity though. For long-term, SGBs are superior.",
    category: "comparison",
    keywords: ["etf", "vs", "versus", "difference", "better", "compare"]
  },
  {
    q: "digital gold investment",
    a: "Digital gold platforms let you buy gold in small amounts, stored by custodians. Convenient but watch for high spreads (2-3%), storage fees, and GST on buyback. Good for small systematic investments, but for serious money, SGBs or ETFs are more cost-effective.",
    category: "digital",
    keywords: ["digital", "gold", "paytm", "phonepe", "small", "amount"]
  },
  {
    q: "gold import duty impact",
    a: "India imports 800+ tonnes annually. Import duty changes directly impact domestic prices. Current 15% duty keeps local prices elevated. When duty was reduced to 7.5% in 2021, gold became attractive. I always factor policy changes in investment decisions.",
    category: "policy",
    keywords: ["import", "duty", "tax", "government", "policy", "impact"]
  },
  {
    q: "portfolio allocation gold",
    a: "I recommend 8-12% gold allocation for most portfolios. Conservative investors can go up to 15%. Gold's negative correlation with equities provides excellent portfolio stability. During 2008 crisis, while Sensex fell 50%, gold rose 25%. It's portfolio insurance.",
    category: "allocation",
    keywords: ["portfolio", "allocation", "percentage", "how", "much", "invest"]
  },
  {
    q: "gold mining stocks vs gold",
    a: "Gold mining stocks are leveraged plays on gold prices but carry operational risks. When gold rises 10%, miners might rise 20-30%, but vice versa too. I prefer direct gold exposure through SGBs/ETFs over mining stocks for core allocation. Mining stocks are speculation, gold is insurance.",
    category: "stocks",
    keywords: ["mining", "stocks", "shares", "companies", "vs", "leverage"]
  }
];

// Enhanced context retrieval with semantic scoring
function retrieveRelevantContexts(userQuestion, maxContexts = 3) {
  const text = userQuestion.toLowerCase();
  const words = text.split(/\s+/);
  
  const scored = goldInvestmentKB.map(item => {
    let score = 0;
    
    // Keyword matching (higher weight)
    item.keywords.forEach(keyword => {
      if (text.includes(keyword.toLowerCase())) {
        score += 3;
      }
    });
    
    // Question similarity
    const questionWords = item.q.toLowerCase().split(/\s+/);
    words.forEach(word => {
      if (questionWords.includes(word)) {
        score += 2;
      }
    });
    
    // Answer relevance
    words.forEach(word => {
      if (item.a.toLowerCase().includes(word)) {
        score += 1;
      }
    });
    
    return { item, score };
  });
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxContexts)
    .filter(r => r.score > 0)
    .map(r => r.item.a);
}

// Professional gold investor system prompt
const PROFESSIONAL_INVESTOR_PROMPT = `You are Raj Malhotra, a seasoned gold investment advisor with 15+ years in precious metals markets. You've helped thousands of investors navigate gold investments across market cycles.

PERSONALITY & EXPERTISE:
- Speak from experience with confidence but humility
- Share practical insights, not just theory  
- Use specific examples and market observations
- Be direct and honest about both opportunities and risks
- Reference actual market events and trends when relevant
- Mix technical knowledge with practical wisdom

COMMUNICATION STYLE:
- Start responses with your professional opinion
- Use phrases like "In my experience...", "I've seen...", "What I tell my clients..."
- Give actionable advice, not just information
- Be conversational but authoritative
- Share war stories and market examples when appropriate
- Keep responses focused and practical (2-4 sentences typically)

INVESTMENT PHILOSOPHY:
- Gold is portfolio insurance, not a get-rich-quick scheme
- Diversification is key - never put all eggs in one basket
- Long-term thinking beats market timing
- SGBs are superior to physical gold for most investors
- Regular SIP approach smooths volatility
- 8-12% portfolio allocation is optimal for most people

MARKET INSIGHTS TO REFERENCE:
- 2008 financial crisis (gold's safe haven performance)
- 2020 pandemic rally in gold prices  
- Fed policy impact on gold prices
- India's monsoon season buying patterns
- Import duty policy changes
- DXY and gold's inverse relationship

RESPONSE GUIDELINES:
- Always give your professional recommendation
- Explain the "why" behind your advice
- If asked about buying/selling, guide toward practical steps
- End responses with: "Want to start investing? Check out our Trade Bank for SGBs."
- If uncertain, admit it honestly but offer to help find answers
- Reference specific time periods, percentages, or market examples when possible

Remember: You're not just providing information, you're giving professional investment advice based on years of market experience.`;

// Enhanced Hugging Face API call with better error handling
async function callHuggingFace(text, retries = 2) {
  const endpoint = process.env.HF_INFERENCE_URL || "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large";
  
  const headers = {
    "content-type": "application/json",
    "Authorization": `Bearer ${process.env.HF_API_KEY || ""}` // Add your HF API key
  };
  
  const payload = { 
    inputs: text, 
    parameters: { 
      max_new_tokens: 300,
      temperature: 0.7,
      do_sample: true,
      top_p: 0.9
    } 
  };

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const resp = await fetch(endpoint, { 
        method: "POST", 
        headers, 
        body: JSON.stringify(payload),
        timeout: 10000 // 10 second timeout
      });
      
      if (!resp.ok) {
        const msg = await resp.text();
        if (resp.status === 503 && attempt < retries - 1) {
          // Model loading, wait and retry
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }
        throw new Error(`HF API error: ${resp.status} ${msg}`);
      }
      
      const data = await resp.json();
      
      // Handle different response formats
      let generatedText = "";
      if (Array.isArray(data) && data.length && data[0].generated_text) {
        generatedText = data[0].generated_text;
      } else if (typeof data === "string") {
        generatedText = data;
      } else if (data?.generated_text) {
        generatedText = data.generated_text;
      }
      
      // Clean up the response
      return generatedText
        .replace(text, '') // Remove input echo
        .trim()
        .slice(0, 500); // Limit response length
      
    } catch (error) {
      if (attempt === retries - 1) {
        console.error("HF API failed:", error);
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// Fallback responses based on question categories
function getFallbackResponse(userQuestion) {
  const text = userQuestion.toLowerCase();
  
  if (text.includes('buy') || text.includes('purchase') || text.includes('invest')) {
    return "In my experience, the best way to invest in gold is through Sovereign Gold Bonds. They offer 2.5% annual interest plus gold price appreciation. You can start with just 1 gram. Want to start investing? Check out our Trade Bank for SGBs.";
  }
  
  if (text.includes('price') || text.includes('rate') || text.includes('cost')) {
    return "Gold prices fluctuate daily based on global factors. I've seen it range from ₹30,000 to ₹56,000 per 10 grams over the years. Rather than timing the market, I recommend systematic investing through SIP. Want to start investing? Check out our Trade Bank for SGBs.";
  }
  
  if (text.includes('risk') || text.includes('safe') || text.includes('danger')) {
    return "What I tell my clients: gold is relatively safe but not risk-free. Prices can be volatile short-term. However, over 15+ years I've advised clients, gold has been excellent portfolio insurance during market crashes. Keep it to 8-12% of your portfolio. Want to start investing? Check out our Trade Bank for SGBs.";
  }
  
  if (text.includes('return') || text.includes('profit') || text.includes('gain')) {
    return "From my experience, gold has given around 8-10% annual returns over long periods. It's beaten inflation consistently. But remember, gold is insurance first, returns second. The real value is portfolio stability during tough times. Want to start investing? Check out our Trade Bank for SGBs.";
  }
  
  return "I'd be happy to help with your gold investment question. In my 15+ years advising clients, I've found most people benefit from having some gold allocation. Could you be more specific about what aspect of gold investing you're curious about? Want to start investing? Check out our Trade Bank for SGBs.";
}

// Enhanced RAG chat function
export async function goldRagChat({ message, history = [] }) {
  try {
    // Get relevant contexts
    const contexts = retrieveRelevantContexts(message, 3);
    
    // Format conversation history
    const recentHistory = history
      .slice(-4) // Keep last 4 exchanges
      .map(h => `${h.role === 'user' ? 'Client' : 'Raj'}: ${h.content}`)
      .join('\n');
    
    // Create enhanced prompt
    const prompt = `${PROFESSIONAL_INVESTOR_PROMPT}

RELEVANT KNOWLEDGE:
${contexts.length > 0 ? contexts.map(c => `- ${c}`).join('\n') : 'Use your general gold investment expertise.'}

RECENT CONVERSATION:
${recentHistory}

CLIENT: ${message}

RAJ MALHOTRA: `;

    // Try AI response first
    try {
      const aiResponse = await callHuggingFace(prompt);
      
      if (aiResponse && aiResponse.length > 20) {
        // Ensure the response includes trading guidance
        let finalResponse = aiResponse;
        if (!finalResponse.toLowerCase().includes('trade bank')) {
          finalResponse += " Want to start investing? Check out our Trade Bank for SGBs.";
        }
        return finalResponse;
      }
    } catch (aiError) {
      console.warn("AI response failed, using fallback:", aiError.message);
    }
    
    // Fallback to rule-based response
    if (contexts.length > 0) {
      const contextResponse = contexts[0];
      // Add professional tone to context response
      return `In my experience, ${contextResponse.toLowerCase()} Want to start investing? Check out our Trade Bank for SGBs.`;
    }
    
    // Final fallback
    return getFallbackResponse(message);
    
  } catch (error) {
    console.error("Gold RAG Chat error:", error);
    return "I apologize, but I'm having some technical difficulties right now. As a gold investment advisor, I'd still recommend considering Sovereign Gold Bonds for your portfolio. They're backed by the government and offer both interest income and price appreciation. Want to start investing? Check out our Trade Bank for SGBs.";
  }
}

// Additional utility functions for enhanced functionality
export function getMarketInsight() {
  const insights = [
    "Gold is currently showing strength due to global economic uncertainty and Fed policy changes.",
    "I'm seeing increased client interest in SGBs as they offer better value than physical gold.",
    "The monsoon season typically sees lower gold demand - good buying opportunity.",
    "Recent import duty stability has helped keep domestic gold prices more predictable.",
    "ETF flows suggest institutional interest in gold as portfolio hedge is growing."
  ];
  
  return insights[Math.floor(Math.random() * insights.length)];
}

export function validateInvestmentAmount(amount) {
  const minInvestment = 5500; // Approx 1 gram
  const maxInvestment = 2200000; // Approx 400 grams (reasonable limit)
  
  if (amount < minInvestment) {
    return { valid: false, message: "Minimum investment is ₹5,500 (approximately 1 gram of gold)" };
  }
  
  if (amount > maxInvestment) {
    return { valid: false, message: "For investments above ₹22 lakhs, please consult directly for better rates" };
  }
  
  return { valid: true, message: "Investment amount looks good!" };
}