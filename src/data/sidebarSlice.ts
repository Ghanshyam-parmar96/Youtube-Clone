import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface SidebarState {
  isExpanded: boolean;
  closePannal: boolean;
  isChecked: boolean;
  playlists: { id: string; name: string }[];
  subscriptions: {channelName : string; id : string; imgUrl: string;}[];
}

// Define the initial state using that type
const initialState: SidebarState = {
  isExpanded: false,
  closePannal: window.innerWidth < 1535,
  isChecked: false,
  playlists: [
    { id: "PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37", name: "javaScript" },
    { id: "PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige", name: "React" },
    { id: "PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW", name: "Chai aur Backend" },
    { id: "PLXQpH_kZIxTWQfh_krE4sI_8etq5rH_z6", name: "OOP in JavaScript" },
    { id: "PLXQpH_kZIxTWOcC8wvUHBMLSMQQ8LgcmU", name: "Solid principle" },
    { id: "PLwgFb6VsUj_l3XGLgZTf5lXq9rPAQ9COu", name: "javaScript Mastery" },
    { id: "PLinedj3B30sDby4Al-i13hQJGQoRQDfPo", name: "Node js" },
    { id: "PLwGdqUZWnOp2Hl93jUB3wShs2A_U2e17d", name: "Complete CSS" },
    { id: "PLwGdqUZWnOp2Z3eFOgtOGvOWIk4e8Bsr_", name: "MERN Stack" },
    { id: "PLfEr2kn3s-brb-vHE-c-QCUq-nFwDYtWu", name: "React" },
    { id: "PLu0W_9lII9agwh1XjRt242xIpHhPT2llg", name: "Python" },
    { id: "PL8p2I9GklV44sj_Ikp8jQSvwD-m9htnHT", name: "Next js" },
    { id: "PL8p2I9GklV47ZpFC9sNHTXwJRgwwzdkNG", name: "React Testing Library" },
    { id: "PLPppPPmk0i3jsaPV9pEnvIrz0_mxXNQKC", name: "Tanstack query" },
  ],
  subscriptions : [
    {
        channelName: "Chai aur Code",
        id: "UCNQ6FEtztATuaVhZKCY28Yw",
        imgUrl:
            "https://yt3.googleusercontent.com/1FEdfq3XpKE9UrkT4eOc5wLF2Bz-42sskTi0RkK4nPh4WqCbVmmrDZ5SVEV3WyvPdkfR8sw2=s176-c-k-c0x00ffffff-no-rj",
    },
    {
        channelName: "Coder's Gyan",
        id: "UCo9xTRmg1SqQ5JSsA2fAgJw",
        imgUrl:
            "https://yt3.googleusercontent.com/ytc/AIf8zZRhrM28GqZV2TWnm0v7e8QPuTHaPz2ke1HIZCcM=s176-c-k-c0x00ffffff-no-rj",
    },
    {
        channelName: "Harshit vashisth",
        id: "UCrkQMtWNtuq-1j0q8c2RVeQ",
        imgUrl:
            "https://yt3.googleusercontent.com/ytc/AIf8zZQfXnK7hfGh1zShcMGdLnRV5NBV-8uwMvNNnXrXDA=s176-c-k-c0x00ffffff-no-rj",
    },
    {
        channelName: "Piyush Garg",
        id: "UCf9T51_FmMlfhiGpoes0yFA",
        imgUrl:
            "https://yt3.googleusercontent.com/H3djB_hVq1Ka1auGf5eCi-wUfwI-kctMW-skVqrXnJwAvqQxI8XSw_ErmyUMNEQmMIxcQgNhNGU=s176-c-k-c0x00ffffff-no-rj",
    },
    {
        channelName: "6 Pack Programmer",
        id: "UCO7afj9AUo0zV69pqEYhcjw",
        imgUrl:
            "https://yt3.googleusercontent.com/fh9PW3GdzRaGngR0IDM4cLun7vixMPtOc0Mx-ia-VvR3zsvSNsJaPR2koYMDT1iQgUQNlwXuwg=s176-c-k-c0x00ffffff-no-rj",
    },
    {
        channelName: "Thapa Technical",
        id: "UCwfaAHy4zQUb2APNOGXUCCA",
        imgUrl:
            "https://yt3.googleusercontent.com/ytc/AIf8zZT7jZRyL-nOK3OdE8LBJpT2u5MimC-yeh8_jYpWrg=s176-c-k-c0x00ffffff-no-rj",
    },
    {
        channelName: "Coding Scenes",
        id: "UCJWfFbQphbXluuIO6QyPKOw",
        imgUrl:
            "https://yt3.googleusercontent.com/VNfZZiY0zSf_pv0x9GjQ28xnmMpbFmc2_T4yL21ZIx00JXRNoT5OERzjfRMq5ISariKtflmNDA=s176-c-k-c0x00ffffff-no-rj",
    },
    {
        channelName: "Anurag Singh ProCodrr",
        id: "UCbK5xfFYH99Hu2pl4CBarNg",
        imgUrl:
            "https://yt3.googleusercontent.com/Vbihf6I3qpDU-z9t-OzXj8zraayJl02IhLu9julAUOfar6Y2I9zi0GambaWkCDOlaIFSk6cw6dI=s176-c-k-c0x00ffffff-no-rj",
    },
    {
        channelName: "CodeWithHarry",
        id: "UCeVMnSShP_Iviwkknt83cww",
        imgUrl:
            "https://yt3.googleusercontent.com/ytc/AIf8zZTNiWLD2-Qw1eWFmRJkGBzfI-8oFNmYk5tBnpNurQ=s176-c-k-c0x00ffffff-no-rj",
    },
    {
        channelName: "Sheryians Coding School",
        id: "UCc7gpqMnnOSbU_F2-5MVVZw",
        imgUrl:
            "https://yt3.googleusercontent.com/M8HHa-4HpA1tPBYyCclC5JmODA7vx77XryhQe_0_4L9bCfpYwiDr7uJc3bOb9UZKJpogSC9OvA=s176-c-k-c0x00ffffff-no-rj",
    },
    {
        channelName: "Tanay Pratap",
        id: "UCNFmBuclxQPe57orKiQbyfA",
        imgUrl:
            "https://yt3.googleusercontent.com/A_3mLbY1nzH3MPjzEftkO8LK02HazD4PWy9XbwLDQ4hDkbBCla4EkcVNM0kZDTeMWqNCD4jVbA=s176-c-k-c0x00ffffff-no-rj",
    },
    {
        channelName: "Apna College",
        id: "UCBwmMxybNva6P_5VmxjzwqA",
        imgUrl:
            "https://yt3.googleusercontent.com/nhDLqeIgXMJBDIrX2bXavvHoWX0tsslDEh7k2xZ1P0W8b_CMRVigp2kxJubYEVwBcBlogZDe=s176-c-k-c0x00ffffff-no-rj",
    },
    {
        channelName: "Technical Suneja",
        id: "UCHIbErciyS3Hs0kjAz-at5Q",
        imgUrl:
            "https://yt3.googleusercontent.com/f-a0P-cpVfBwfyBNmEE2CRUpJHFQEjtA_h_LxIKtg05XlneojDSyUsn1eaqYAnWSKTfHybq-8w=s176-c-k-c0x00ffffff-no-rj",
    },
],
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
    },
    resizeBy: (state, action: PayloadAction<number>) => {
      state.closePannal = action.payload < 1535;
    },
    toggleSwitch: (state, action: PayloadAction<boolean>) => {
      state.isChecked = action.payload;
    },
  },
})

export const { toggleSidebar, resizeBy, toggleSwitch } = sidebarSlice.actions

export default sidebarSlice.reducer