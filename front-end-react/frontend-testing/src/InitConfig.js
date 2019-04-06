import config from "react-global-configuration";

function InitConfig(production) {
  config.set({
    host_url: production
      ? `http://sup-express.herokuapp.com`
      : `http://sup-express.herokuapp.com`,
    routes: {
      user_login: `/user/login`,
      user_signup: `/user/signup`,
      user_profile: `/user/profile`,
      admin_login: `/admin/login`,
      admin_signup: `/admin/signup`,
      students: `/admin/students`,
      sources: `/admin/sources`,
      get_tags: `/notice/tags`,
      create_tag: `/admin/addtag`,
      delete_tag: `/admin/deletetag`,
      get_all_notices: `/notice/getall`,
      create_notice: `/notice/create`,
      get_notice: `/notice/id/:noticeID`
    }
  });
}

export default InitConfig;
