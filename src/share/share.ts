import { fetchNoBody, fetchBodyForm, mEmpty } from "@/share/fetch";

export const loginUser = ref("");
export const loginToken = ref(""); // without 'Bearer '
export const loginAuth = ref(""); // with 'Bearer '
export const loginSelfInfo = ref();
export const Mode = ref("normal"); // 'normal' or 'approval', or 'admin'

//////////////////////////////////////////////////////////////////////////////////////

// fill loginUser

const self = async () => {
    return (await getUserList(loginUser.value, ''))[0]
}

export const getUname = async () => {
    const rt = (await fetchNoBody(
        "api/user/auth/uname",
        "GET",
        mEmpty,
        loginAuth.value
    )) as any[];
    if (rt[1] != 200) {
        alert(rt[0]);
        return false;
    }
    loginUser.value = rt[0];

    // other login user profile
    // ***
    loginSelfInfo.value = await self()
    console.log(loginSelfInfo.value)
    // ***

    return true;
};

export const getUserList = async (uname: string, fields: string) => {
    // means list all fields. 
    // swagger 'Try' uses '{fields}' as empty path param, so we intentionally use this literal string
    if (fields == undefined || fields == null || fields.length == 0) {
        fields = "{fields}";
    }
    const mParam = new Map<string, any>([
        ["uname", uname],
    ]);
    const rt = (await fetchNoBody(
        `api/admin/user/list/${fields}`,
        "GET",
        mParam,
        loginAuth.value
    )) as any[];
    if (rt[1] != 200) {
        alert(rt[0]);
        return null;
    }
    return rt[0];
};

export const getUserOnline = async () => {
    const rt = (await fetchNoBody(
        `api/admin/user/onlines`,
        "GET",
        mEmpty,
        loginAuth.value
    )) as any[];
    if (rt[1] != 200) {
        alert(rt[0]);
        return null;
    }
    return rt[0];
}

// export const isUserOnline = async (uname: string) => {
//     const onlines: string[] = await getUserOnline()
//     return onlines.includes(uname)
// }

export const setUser = async (uname: string, data: any) => {
    const fields = 'Active,SysRole'
    const mForm = new Map<string, any>([
        ["uname", uname],
        ["SysRole", data.admin ? "admin" : ""],
        ["Active", data.active]
    ]);
    const rt = (await fetchBodyForm(
        `api/admin/user/update/${fields}`,
        "PUT",
        mEmpty,
        mForm,
        loginAuth.value
    )) as any[];
    if (rt[1] != 200) {
        alert(rt[0]);
        return null;
    }
    return rt[0];
}

export const putLogout = async () => {
    const rt = (await fetchNoBody(
        `/api/user/auth/sign-out`,
        `PUT`,
        mEmpty,
        loginAuth.value
    )) as any[];
    if (rt[1] != 200) {
        alert(rt[0]);
        return false;
    }
    return true
}