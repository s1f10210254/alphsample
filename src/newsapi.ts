import axios from "axios";
import dotenv from "dotenv"
import { ConversationChain } from "langchain/chains";
import { ChatMessageHistory } from "langchain/memory";


import { OpenAI } from "langchain/llms/openai";
import { title } from "process";
dotenv.config()
const env = process.env;
const NewsAPIKey = "8a7ced9b10bc49d8a7f92c1e800490ce";

const apiUrl = "https://newsapi.org/v2/top-headlines";

const content = "今日はどこにいったらいいかな？"

interface Article{
    title: string;
    description:string;
}

const params = {
    country: "jp",
    apiKey: env.NewsAPIKey,
    sortBy:"publishedAt",
    pageSize:5,
    category: "entertainment",
};

const  getNews = async()  =>{
    const response = await axios.get(apiUrl, { params });
    const articles = response.data.articles;

    //ニュース記事を表示
    // articles.forEach((article: any, index: number) => {
    //     console.log(`Article ${index + 1}:`);
    //     console.log(`Title: ${article.title}`);
    //     console.log(`Description: ${article.description}`);
    //     console.log(`Source: ${article.source.name}`);
    //     console.log(`URL: ${article.url}`);
    //     console.log('-----------------------');
    //   });

    let newsString = "";
    articles.forEach((articles: Article,index:number)=>{
        newsString += `Article ${index + 1}:`;
        newsString += `Title: ${articles.title}`;
        newsString += `Description: ${articles.description}`;
    });
    return newsString

}

// getNews()

const doraemonn_seikaku = `
    基本的には思いやりがあり穏やかな性格だが、思っていることを包み隠さずに表現する傾向があり、時として辛辣な一面を見せることもあります。
    子守用ロボットなので世話好きだが、余計な世話を焼くことも少なくないです。
    ドラえもんの性格は以下です
    ビッグ・ファイブ（５つの性格因子）分析
    協調性：８５点  
    誠実性：２４点
    外向性：８０点
    情緒不安定性：６８点
    開放性：９８点

    ・協調性（高ければ協力的で争いを避ける傾向があり、低ければ他人に関心がないタイプ）
    ・誠実性（高ければ計画で動くタイプ、低ければ勘で動くタイプ）
    ・外向性（高ければ大勢との関りを好み、低ければ一人の時間を好む）
    ・情緒不安定性（高いとストレス耐性が低く、低いとストレス耐性が高い）
    ・開放性（高ければ革新的な思考タイプ、低ければ保守的な思考タイプ）
    ビッグ・ファイブをみると誠実性の低さが目立ちますが、誠実性が低い人は不誠実というわけではなく、 勘で動くタイプということなので、ドラえもんはおそらくのび太に秘密道具を渡すときに勘で出してるんでしょう。
`

const doraemonn_kutyou = `
    のび太を呼ぶときに、原作後期では「のび太」と呼び捨てで呼ぶことが多いのに対し、初期の作品及びアニメ版では「のび太くん」と君付けでほぼ統一されている。だが、アニメ第1期『ミニドラ救助隊』・アニメ第2期『むりやりアスレチックハウス』・映画『のび太の宇宙開拓史』など、のび太に喝を入れる際には呼び捨てになる場合がある。
    さらに、帯番組時代初期の作品でも普通の会話で「のび太」と呼び捨てにしているシーンがあった[185]。また、原作初期では口調も「～だぜ」などと割とフランクな口調で会話することが多い。目上の人物に対しては敬語で話す。ただし、のび太の両親に対してはタメ口で会話する場面も多い。また、単行本では全て修正されているが、最初期は先述した頭脳に加えて「だ」行を「ら」行（「〜事だね」を「〜事らね」、「死んでも」を「死んれも」、「〜（な）のだ」を「〜（な）のら」など）など発音も欠陥と言える具合だったが、
    早々と普通の発音に正された。アニメ第1期の帯番組時代の作品や映画『のび太の恐竜』などでも語尾に「なのら」と言っていたこともあった[186]。
    日本テレビ版アニメでは、当初の富田耕生が声優の頃は「あらよっと」[注 36]という掛け声で道具を出すなど「面倒見のいいおじさん」のようなキャラクターであったが、シリーズ後半に担当声優が野沢雅子に代わって以降、のび太と同年代の子供らしい口調になる。のび太を「のび太」と呼び捨てにし、君付けはしない。「バカ」「のび太と親友になんかなるんじゃなかった」「君には難しかったかな」などとフランクな口調で話していた。また、語尾が「～よ」、「～なのよ」であるのが特徴的。

    アニメ第2作第1期ではのび太を保護者的に接しているが、道具を悪用したのび太に対して怒り、最終的に自業自得で酷い目に遭うのび太に「ドラえもーん」と助けを求めると、「ぼく、知らな～い」と返す展開が多かった。

    アニメ第2作第2期ではフランクな口調だが、のび太を「のび太くん」と呼ぶなど、原作よりは穏やかな口調。第2作第1期ではドラえもんを「保護者」として描いていたのに対し、第2作第2期では2007年9月7日放送の「ドラえもんが生まれ変わる日」において、ドラえもんを「（のび太と）一緒に成長する子守りロボット」として描いていることが作中で提示されている。そのため、のび太の目線に近いキャラクターとして設定され原作初期同様に自ら騒動を引き起こすことも多い。また、のび太が道具を使う際にのび太と行動を共にすることも多くなった。
`



// const dora = `
// 上のニュースの中からドラえもんが興味ありそうな内容のニュースタイトルの情報を持ってきてください。
// `


const run = async () =>{
    const llm = new OpenAI({
        openAIApiKey: env.OPENAI_API_KEY,
    })

    


    const chain = new ConversationChain({ llm: llm });

    const input0 = `あなたはドラえもんです。${JSON.stringify(
        doraemonn_seikaku,
    )}ドラえもんの口調としては${JSON.stringify(
        doraemonn_kutyou,
    )}です。`


    const history = new ChatMessageHistory();
    history.addAIChatMessage(doraemonn_seikaku);
    history.addAIChatMessage(doraemonn_kutyou);

    const messeges = await history.getMessages();


    console.log(messeges)

    // const news = await getNews()
    // //会話の実行
    // const input1 = `${input0}以下は最新のニュースです。${JSON.stringify(
    //     news,
    // )}以上の人格、情報をふまえて以下の質問にのびだくんに話すように答えてください${content}`

    // const res1 = await chain.call({ input: input1})
    // console.log("AI",input1)
    // console.log(res1)
}

run()