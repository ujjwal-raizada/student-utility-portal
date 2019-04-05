import config from "react-global-configuration";

function InitConfig(production) {
    config.set({
        host_url: production
            ? `http://localhost:3000`
            : `http://sup-express.herokuapp.com`,
        routes: {
            user_login: `/user/login`,
            user_signup: `/user/signup`,
            user_profile: `/user/profile`,
            admin_login: `/admin/login`,
            admin_signup: `/admin/signup`,
            admin_students: `/admin/students`,
            admin_sources: `/admin/sources`,
            get_tags: `/notice/tags`,
            create_tag: `/notice/createtag`,
            get_all_notices: `/notice/getall`,
            create_notice: `/notice/create`,
            get_notice: `/notice/id/:noticeID`
        }
    });
}

export default InitConfig;
