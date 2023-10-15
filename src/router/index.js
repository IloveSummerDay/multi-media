import { createRouter, createWebHistory } from 'vue-router'
import TopNavigationBar from '../components/TopNavigationBar.vue';
import LoginInVue from '../views/LoginIn.vue'
import MessageVue from '../views/Message.vue'
import MessageNavBar from '../components/MessagePageViewComponents/MessageNavBar.vue'
import ClassChat from '../components/MessagePageViewComponents/ClassChat.vue'
import Input from '../components/MessagePageViewComponents/Input.vue'
import EvaluateAndDiscussion from '../components/MessagePageViewComponents/EvaluateAndDiscussion.vue'
import ThemeDiscussion from '../components/MessagePageViewComponents/ThemeDiscussion.vue'
import AskTeacher from '../components/MessagePageViewComponents/AskTeacher.vue'
import InputPlus from '../components/MessagePageViewComponents/InputPlus.vue'
import HomeVue from '../views/Home.vue'
import HistoryVue from '../views/History.vue'
import KnowMoreHistory from "../components/HistoryViewComponents/KnowMoreHistory.vue";
import PassLevel from "../components/HistoryViewComponents/PassLevel.vue";
import SecondNav from "../components/SecondNav.vue";
import ExperienceVue from '../views/Experience.vue'
import KnowledgeCardVue from '../views/KnowledgeCard.vue'
import CenterVue from '../views/Center.vue'
import AccountInformation from '../components/CenterViewComponent/AccountInformation.vue'
import StuChart from '../components/CenterViewComponent/StuChart.vue'
import TextIdentifyExperience from "../components/ExperienceViewComponent/TextIdentifyExperience.vue";
import ObjIdentifyExperience from "../components/ExperienceViewComponent/ObjIdentify.vue";
import AIchatExperience from "../components/ExperienceViewComponent/AIchat.vue";
import TimeAxes from "../components/HistoryViewComponents/TimeAxes.vue";
import HistoryStaticUI from "../components/HistoryViewComponents/HistoryStaticUI.vue";

const routes = [
  {
    path: '/', component: LoginInVue
  },
  {
    path: '/home', component: HomeVue, name: 'Home'
  },
  {
    path: '/message',
    components: {
      default: MessageVue,
    },
    children: [
      {
        path: 'classChat',
        components: {
          MessageNavBar, 
          Input,
          ClassChat
        },
        props: { MessageNavBar: { navIndex: 0 } },
      },
      {
        path: 'ed',
        components: { ThemeDiscussion, MessageNavBar, InputPlus },
        props: { MessageNavBar: { navIndex: 1 }, InputPlus: { placeholder: '来和大家一起讨论吧！', ask: false, isAbsolute: true } },
        children: [
          {
            path: '',
            component: EvaluateAndDiscussion
          }
        ]
      },
      {
        path: 'askTeacher',
        components: {
          MessageNavBar,
          AskTeacher,
          InputPlus
        },
        props: { MessageNavBar: { navIndex: 2 }, InputPlus: { placeholder: '快来输入你的疑惑吧~', ask: true, isAbsolute: true } },
      }
    ]
  },
  {
    path: '/history/:time(\\d+)',
    component: HistoryVue,
    props: true,
    children: [
      {
        path: '',
        components: {
          TimeAxes,
          HistoryStaticUI
        },
        props: { TimeAxes: true, HistoryStaticUI: true },
      },
      {
        path: 'learnMore', // (/^[A-Za-z]+$/) string
        components: {
          SecondNav,
          KnowMoreHistory
        },
        props: { SecondNav: { secondNavList: ['了解历史', '答题闯关'], useTo: 0, itemHighLightIndex: 0 }, KnowMoreHistory: true },
      },
      {
        path: 'passLevel',
        components: {
          SecondNav,
          PassLevel
        },
        props: { SecondNav: { secondNavList: ['了解历史', '答题闯关'], useTo: 0, itemHighLightIndex: 1 }, PassLevel: true },
      },
    ]
  },
  {
    path: '/experience', component: ExperienceVue, name: 'Experience',
    children: [
      {
        path: 'experience1',
        component: TextIdentifyExperience,
      },
      {
        path: 'experience2',
        component: ObjIdentifyExperience,
      },
      {
        path: 'experience3',
        component: AIchatExperience,
      }
    ]
  },
  {
    path: '/knowledgeCard', component: KnowledgeCardVue, name: 'KnowledgeCard',
  },
  {
    path: '/center', component: CenterVue, name: 'Center',
    children: [
      {
        path: 'learningData',
        components: {
          default: SecondNav,
          StuChart
        },
        props: { default: { secondNavList: ["账号信息", "学习统计"], useTo: 1, itemHighLightIndex: 1 }, StuChart: true }
      },
      {
        path: 'account',
        components: {
          default: SecondNav,
          AccountInformation
        },
        props: { default: { secondNavList: ["账号信息", "学习统计"], useTo: 1, itemHighLightIndex: 0 }, AccountInformation: true }
      },
    ]
  },


]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

