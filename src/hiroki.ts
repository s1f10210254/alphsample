import { ChatMessage, HumanMessage, SystemMessage } from "langchain/schema";
import { ChatOpenAI} from "langchain/chat_models/openai"
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { Calculator } from "langchain/tools/calculator";
import { loadLLM } from "langchain/llms/load";
import { loadAgent } from "langchain/agents/load";
import { loadPrompt } from "langchain/prompts/load";
import { loadChain } from "langchain/chains/load";
import dotenv from "dotenv"
dotenv.config();
const env = process.env;
console.log("API_KEY", env.OPENAI_API_KEY)

////llm
const llm = new OpenAI({
    openAIApiKey: env.OPENAI_API_KEY,
})
const runllm =async() =>{
    const result =  await llm.predict("What would be a good company name for a company that makes cokorful socks?");
    console.log(result)
}
// runllm();

////Chat model
const chat = new ChatOpenAI({
    openAIApiKey: env.OPENAI_API_KEY,
    temperature:0,
})
const runChatModel = async()=>{
    const Human = await chat.predictMessages([
        new HumanMessage("Translate this sentence from English to Japanise. I love programming.")
    ]);

    const result = Human.content
    // const Chat = await chat.predictMessages([
    //     new ChatMessage("Translate this sentence from English to Japanise. I love programming.")
    // ]);
    const System = await chat.predictMessages([
        new SystemMessage("Translate this sentence from English to Japanise. I love programming.")
    ]);

    
    
    console.log("HumanMessage",Human);
    console.log(Human.content)
    console.log("SystemMessage", System);
    
};
// runChatModel();

//// prompt
const runPrompt = async() =>{
    const prompt = PromptTemplate.fromTemplate("What is a good name for a company that makes {product}?");
    const formattedPrompt = await prompt.format({
        product: "colorful socks"
    })
    console.log(formattedPrompt)
}
// runPrompt()

//// Chains

const prompt = PromptTemplate.fromTemplate("What is a good name for a company that makes {product}?")
const chain = new LLMChain({
    llm,
    prompt,
});
const runChain = async()=>{ 
    const result = await chain.run("colorful socks")
    console.log(result)
}
runChain();