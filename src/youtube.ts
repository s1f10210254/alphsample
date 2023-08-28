import { YoutubeLoader } from "langchain/document_loaders/web/youtube"
import dotenv from "dotenv"

dotenv.config()
const env = process.env;
// console.log('envファイル', env.OPENAI_API_KEY);


//npm install youtube-transcript youtube.js
async function youtube() {
    const loader = YoutubeLoader.createFromUrl("https://www.youtube.com/watch?v=ZRtdQ81jPUQ",{
        language:"en",
        addVideoInfo:true,
    });


    // const loader = YoutubeLoader.createFromUrl("https://www.youtube.com/watch?v=bZQun8Y4L2A", {
    // language: "en",
    // addVideoInfo: true,
    // });
    const docs = await loader.load();


    //アイドル専用
    // console.log(docs[0].metadata.description);

    const result = docs[0].metadata.description

    const resultstring = stringify(result)
    
    return resultstring
}
// youtube().catch((err) => {
//     console.error("Error:", err);
//   });


// //npm install ignore

// import { GithubRepoLoader } from "langchain/document_loaders/web/github"

// const run = async () => {
//     const loader = new GithubRepoLoader(
//         "https://github.com/s1f10210254/maze2/blob/main/src/pages/index.tsx",
//         { branch: "main", recursive:false, unknown: "warn", ignorePaths: ["*.md"]}
//     )
//     const docs = await loader.load();
//     console.log({ docs });

// }

// run()


import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { stringify } from "querystring";
import { Document } from "langchain/document";

async function transformers() {

    const text = `${youtube()}`
    // console.log("text",text)
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize:10,
        chunkOverlap:1,
    });

    const docOutput = await splitter.splitDocuments([
        new Document({ pageContent: text})
    ])
    // console.log(docOutput)

    const concatenatedText = docOutput.map(doc => doc.pageContent).join(""); 
    
    return concatenatedText
}

// transformers().catch((err) => {
//     console.error("Error:", err);
//   });

import { OpenAIEmbeddings } from "langchain/embeddings/openai"

async function TextEmvedding (){
    const embeddings = new OpenAIEmbeddings();

    const res = await embeddings.embedQuery(await transformers())

    // console.log(res);
    return res;
}

// TextEmvedding().catch((err) => {
//     console.error("Error:", err);
//   });

// import { MemoryVectorStore} from "langchain/vectorstores/memory";
// import { TextLoader } from "langchain/document_loaders/fs/text"
// async function VectorStores() {
//     const vectorStores = await MemoryVectorStore.fromTexts(
//         ["Hello wold", "Bye bye", "hello nice world"],
//         [{ id: 2}, { id:1}, {id:3}],
//         new OpenAIEmbeddings()
//     );
//     const resultOne = await vectorStores.similaritySearch("hello world", 1);
//     console.log(resultOne);
// }
// VectorStores()

// async function VectorStores1() {
//     // const text = `${youtube()}`
//     // const docs = await text.load()

//     const loader = new TextLoader("src/document_loaders/example_data/example.txt")
//     const docs = await loader.load()
//     const vectorStore = await MemoryVectorStore.fromDocuments(
//         docs,
//         new OpenAIEmbeddings()
//     );

//     const resultOne = await vectorStore.similaritySearch("hello world", 1);

//     console.log(resultOne);


// }
// VectorStores1()

/////Retrievers

import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib} from "langchain/vectorstores/hnswlib";
import * as fs from "fs";
import { Models } from "openai/resources";

const text:string = "ぼくドラえもん、のびだくんを助ける役割を持ってるよ！今日はジャイアンにいじめられたんだね。どうしたの？？助けたい"
async function Retriever(content:string) {
    const model = new OpenAI({
        openAIApiKey:env.OPENAI_API_KEY
    });
    //指定したファイルの読み込み
    // const text = fs.readFileSync("state_of_the_union.txt", "utf8");
    // const text = "ぼくドラえもん、のびだくんを助ける役割を持ってるよ！今日はジャイアンにいじめられたんだね。どうしたの？？助けたい"
    //テキストを指定したチャンクサイズで分割し.
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000});
    console.log(textSplitter);
    //オブジェクト配列docs作成
    const docs  = await textSplitter.createDocuments([content]);
    console.log(docs)

    //ベクトルストアの作成(ベクトルストアはテキストやデータの特徴を数値ベクトルで表現するデータ構造)
    //テキストをベクトルに変換し、ベクトル間の類似度を計算することで文章の類似検索や検索クエリのたいおうづけを行う
    const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
    console.log(vectorStore)
    //リトリーバーに変換(ベクトルストア内のベクトルとクエリのベクトルとの類似度を計算し最も類似したデータを取得する役割)
    const vectorStoreRetriever = vectorStore.asRetriever();

    // 質問応答チェインを作成
    const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
    
    const res = await chain.call({
        query: "ここで重要なのはなんですか？",
    });

    const result = JSON.stringify(res.text);
    console.log(result)
    return result;
    
}

Retriever(text)


// async function google() {
//     const llm = new OpenAI({
//         openAIApiKey: env.OPENAI_API_KEY,
//     })
//     const tool_names = ["google-serch"]
//     const tools = 
// }

import { PlaywrightWebBaseLoader, Page, Browser,Response } from "langchain/document_loaders/web/playwright";
import { chromium } from "playwright";

//PlaywrightGotoOptions`
{/*
timeout:type number デフォルト */}

// async function runPlaywright() {
//     const loader = new PlaywrightWebBaseLoader("https://www.tabnews.com.br/",{
//         launchOptions:{
//             headless:false,
//         },
//         gotoOptions:{
//             waitUntil:"domcontentloaded",
//         },

//         async evaluate(page:Page,browser:Browser,response:Response | null): Promise<string>{
//             await page.waitForResponse("https://www.tabnews.com.br/va/view")

//             const result = await page.evaluate(() => document.body.innerHTML);
//             return result;
//         },
//     });

//     const docs = await loader.load();
//     console.log(docs)
// }