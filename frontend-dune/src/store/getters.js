const getters = {

  isLogin: state => state.isLogin,

  //user
  token: state => state.user.token,
  userId: state => state.user.userId,
  userInfo: state => state.user.userInfo,
  adduserimgVisible: state => state.user.adduserimgVisible,
  userpic: state => state.user.userpic,
  hotquestions: state => state.question.hotquestions,

  // question
  chatMessages: state => state.question.chatMessages,

  // home

  // select

  //userPortrait
  portrait: state => state.userPortrait.portrait,
  word_Cloud: state => state.userPortrait.word_Cloud,
};

export default getters
