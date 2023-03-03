import "./lib/bitrix24-rest";

if (window.BX24 && typeof window.BX24.initAuth == "function") {
    window.BX24.initAuth({
        client_id: "",
        client_secret: "",
        "access_token": "",
        "refresh_token": "",
        "expires_in": "",
        "domain": "",
        "member_id": ""
        // lang: "ru",
        // placement: "DEFAULT",
        // placement_options: {id:10}
    });
}

const BX24 = window.BX24

export {BX24};

