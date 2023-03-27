import { fetchNoBody, fetchBodyForm, mEmpty } from "@/share/fetch";

export const loginUser = ref("");
export const loginToken = ref(""); // without 'Bearer '
export const loginAuth = ref(""); // with 'Bearer '
export const selfInfo = ref();
export const selfAvatar = ref("");
export const Mode = ref("normal"); // 'normal' or 'approval', or 'admin'

//////////////////////////////////////////////////////////////////////////////////////

// fill loginUser

const self = async () => {
    return (await getUserList(loginUser.value, ''))[0]
}

export const fillSelf = async () => {
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
    selfInfo.value = await self()
    console.log(selfInfo.value)
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

export const putUser = async (uname: string, data: any) => {
    const fields = 'Name,DOB,Phone,City,Active,SysRole' // => struct field name;
    const mForm = new Map<string, any>([
        ["uname", uname],
        ["Name", data.name],
        ["DOB", data.dob],
        ["Phone", data.phone],
        ["City", data.city],
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

export const postFormfile = async (file: any, note: string, addym: boolean, group0: string, group1: string, group2: string) => {
    const mForm = new Map<string, any>([
        ["file", file],
        ["note", note],
        ["addym", addym],
        ["group0", group0],
        ["group1", group1],
        ["group2", group2],
    ]);
    const rt = (await fetchBodyForm(
        `/api/file/auth/upload-formfile`,
        `POST`,
        mEmpty,
        mForm,
        loginAuth.value
    )) as any[];
    if (rt[1] != 200) {
        alert(rt[0]);
        return false;
    }
    //
    // a variable to get rt[0].xxx here !!!
    //
    return true
}

export const setAvatar = async (avatar: any, left: number, top: number, width: number, height: number) => {
    const mForm = new Map<string, any>([
        ["avatar", avatar],
        ["left", left],
        ["top", top],
        ["width", width],
        ["height", height],
    ]);
    const rt = (await fetchBodyForm(
        `/api/user/auth/upload-avatar`,
        `POST`,
        mEmpty,
        mForm,
        loginAuth.value
    )) as any[];
    if (rt[1] != 200) {
        alert(rt[0]);
        return false;
    }
    return true
}

export const getAvatar = async () => {
    const rt = (await fetchNoBody(
        `/api/user/auth/avatar`,
        `GET`,
        mEmpty,
        loginAuth.value
    )) as any[]
    if (rt[1] != 200) {
        alert(rt[0]);
        return false;
    }
    selfAvatar.value = rt[0].src;
    return true
}