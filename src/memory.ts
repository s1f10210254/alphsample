import { ConversationChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
// import { character } from "chara";  
// import { buy } from "buy";  
// import { sell } from "sell";
import axios from "axios";
import dotenv from "dotenv"
// 環境変数
dotenv.config()
const env = process.env;
console.log('envファイル', env.OPENAI_API_KEY);



const llm = new OpenAI({
  openAIApiKey: env.OPENAI_API_KEY,
});
/*
const getStockPrice = async () => {
    const apiKey = "";
    const symbol = "AAPL";
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=USDJPY&interval=15min&apikey=${apiKey}`;
  
    try {
        const response = await axios.get(url);
        const timeSeries = response.data["Time Series (15min)"];
        const timestamps = Object.keys(timeSeries);
        const latesttimestamps = timestamps.slice(0, 8);

        const stockdata = latesttimestamps.map(timestamp => ({
            time: timestamp,
            open: timeSeries[timestamp]['1. open'],
            high: timeSeries[timestamp]['2. high'],
            low: timeSeries[timestamp]['3. low'],
            close: timeSeries[timestamp]['4. close'],
        }));

        return stockdata;

    } catch (error) {
        console.error(error);
        throw error;
    }
};
*/

export const character = `
あなたが先程購入した金額をxとします。xが2%減少した際には即売却するものとします。xが上昇している場合は下がるまでに到達した最大の額から2%減った際に売却するものとします。売却した日時を記録するようにしてください
`;

export const buy = `
現在のFXのレートがあるものとします。あなたは今50万円持っているものとし、そのお金でFX投資をするものとします。
`;
export const sell = `
売却した際の収支、日時を表示してください
`;


export const run = async () => {

  
  // LLMの準備
  // const llm = new OpenAI({ temperature: 0 });
  // const llm

  
  // ConversationChainの準備
  const chain = new ConversationChain({ llm: llm });
/*
  const kabuka = getStockPrice()
  .then(stockData => {
      console.log(stockData);
  }) //ここで直近２時間の株価表示、なんかAPI止まったから放置してる
*/
  // 会話の実行
  const input1 = buy; //例として直近２時間で一番安かったときのものを買うようにしてみてる
  const res1 = await chain.call({ input: input1 });
  console.log("Human:", input1);
  console.log("AI:", res1["response"]);

  // 会話の実行
  const input2 = character; //戦略入力
  const res2 = await chain.call({ input: input2 });
  console.log("Human:", input2);
  console.log("AI:", res2["response"]); 

  // 会話の実行
  const input3 = sell; //売却、収支と日時出力
  const res3 = await chain.call({ input: input3 });
  console.log("Human:", input3);
  console.log("AI:", res3["response"]); 

};
run();