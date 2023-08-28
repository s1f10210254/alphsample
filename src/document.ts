import { error } from "console";
import { PlaywrightWebBaseLoader, Page, Browser,Response } from "langchain/document_loaders/web/playwright";
import { chromium } from "playwright";


// type PlaywrightWebBaseLoaderOptions = {
//     launchOptions?: headless:false,;
//     gotoOptions?: PlaywrightGotoOptions;
//     evaluate?: PlaywrightEvaluate;
//   };
// const loader = async() =>{
//     new PlaywrightWebBaseLoader("https://www.tabnews.com.br/", {
//         launchOptions:{
//             headless:false,
//         },
//         gotoOptions:{ 
//             waitUntil: "domcontentloaded",
//         },
//     async evaluate(page:Page, browser: Browser, response:Response | null){
//         await page.waitForResponse("https://www.tabnews.com.br/va/view");
//         const result = await page.evaluate(() => document.body.innerHTML);
//         return result; 
//     },
// })
// }

// async function main() {
//     const url = "https://www.tabnews.com.br/";
//     const loader = new PlaywrightWebBaseLoader(url);
//     const docs = await loader.load();
//     // raw HTML page content
//     const extractedContents = docs[0].pageContent;
//     console.log(extractedContents);
// }

// main().catch((err) =>{
//     console.error("Error:",err)
// })

async function main2() {
    const loader = new PlaywrightWebBaseLoader("https://www.tabnews.com.br/",{
        launchOptions:{
            headless:false,
        },
        gotoOptions:{
            waitUntil:"domcontentloaded",
        },

        async evaluate(page:Page,browser:Browser,response:Response | null): Promise<string>{
            await page.waitForResponse("https://www.tabnews.com.br/va/view")

            const result = await page.evaluate(() => document.body.innerHTML);
            return result;
        },
    });

    const docs = await loader.load();
    console.log(docs)
}
main2().catch((err) => {
    console.error("Error:", err);
  });