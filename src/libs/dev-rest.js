import "./lib/bitrix24-rest";

import authRest from '@/config/auth-rest'

if (window.BX24 && typeof window.BX24.initAuth == "function") {
    window.BX24.initAuth(authRest);
}

const BX24 = window.BX24

export {BX24};

