import { URL_SIGN } from "@/share/ip"
import { fetchNoBody, fetchBodyForm, fetchBodyObject, mEmpty, fetchErr } from "@/share/fetch";

export const loginUser = ref("");
export const loginToken = ref(""); // without 'Bearer '
export const loginAuth = ref(""); // with 'Bearer '
export const loginAsAdmin = ref(false)
export const SelfInfo = ref();
export const SelfAvatar = ref("");
export const Mode = ref("view") // view / input / users
export const ModalOn = ref(false);
export const PostIDGroup = ref();
export const PostTitle = ref("");
export const PostCategories = ref("");
export const PostKeywords = ref("");
export const PostJsonHTML = ref("");
export const PostJsonTEXT = ref("");

export const ClearPost = async () => {
    PostTitle.value = ""
    PostCategories.value = ""
    PostKeywords.value = ""
    PostJsonHTML.value = ""
    PostJsonTEXT.value = ""
}

//////////////////////////////////////////////////////////////////////////////////////

const onExpired = async () => {
    alert("session expired, redirecting to sign page")
    location.replace(`${URL_SIGN}`)
}

//////////////////////////////////////////////////////////////////////////////////////

export const getPing = async () => {
    const rt = await fetchNoBody(`/api/system/ver`, "GET", mEmpty, "");
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
};

export const getSelfName = async () => {
    const rt = await fetchNoBody("api/user/auth/uname", "GET", mEmpty, loginAuth.value);
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
};

export const getUserInfoList = async (uname: string, fields: string) => {
    // means list all fields. 
    // swagger 'Try' uses '{fields}' as empty path param, so we intentionally use this literal string
    if (fields == undefined || fields == null || fields.length == 0) {
        fields = "{fields}";
    }
    const mQuery = new Map<string, any>([
        ["uname", uname],
    ]);
    const rt = await fetchNoBody(`api/admin/user/list/${fields}`, "GET", mQuery, loginAuth.value);
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
};

export const getUserOnline = async () => {
    const rt = await fetchNoBody(`api/admin/user/online`, "GET", mEmpty, loginAuth.value);
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

// export const isUserOnline = async (uname: string) => {
//     const online: string[] = await getUserOnline()
//     return online.includes(uname)
// }

export const putUser = async (uname: string, data: any) => {
    const fields = 'Name,DOB,Gender,Phone,Country,Addr,City,Active,SysRole,Certified,Official,Employer,Position,PersonalID,PersonalIDType,SysRole,Title,Bio,Tags' // => struct field name;
    const mForm = new Map<string, any>([
        ["uname", uname],
        ["Name", data.name],
        ["DOB", data.dob],
        ["Gender", data.gender],
        ["Phone", data.phone],
        ["Country", data.country],
        ["City", data.city],
        ["Addr", data.addr],
        ["SysRole", data.admin],
        ["Active", data.active],
        ["Certified", data.certified === undefined ? false : data.certified],
        ["Official", data.official === undefined ? false : data.official],
        ["Employer", data.employer],
        ["Title", data.title],
        ["Position", data.position],
        ["PersonalID", data.personalid],
        ["PersonalIDType", data.personalidtype],
        ["SysRole", data.role],
        ["Bio", data.bio],
        ["Tags", data.tags]
    ]);
    const rt = await fetchBodyForm(`api/admin/user/update/${fields}`, "PUT", mEmpty, mForm, loginAuth.value);
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const putLogout = async () => {
    const rt = await fetchNoBody(`/api/user/auth/sign-out`, `PUT`, mEmpty, loginAuth.value);
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
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
    const rt = await fetchBodyForm(`/api/file/auth/upload-formfile`, `POST`, mEmpty, mForm, loginAuth.value);
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const uploadMedia = async (file: any, left: number, top: number, width: number, height: number, group0: string, group1: string, group2: string) => {
    const mForm = new Map<string, any>([
        ["file", file],
        ["note", left > 0 && top > 0 && width > 0 && height > 0 ? `crop:${left},${top},${width},${height}` : ""],
        ["addym", true],
        ["group0", group0],
        ["group1", group1],
        ["group2", group2],
    ]);
    const rt = await fetchBodyForm(`/api/file/auth/upload-formfile`, `POST`, mEmpty, mForm, loginAuth.value);
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const setAvatar = async (avatar: any, left: number, top: number, width: number, height: number) => {
    const mForm = new Map<string, any>([
        ["avatar", avatar],
        ["left", left],
        ["top", top],
        ["width", width],
        ["height", height],
    ]);
    const rt = await fetchBodyForm(`/api/user/auth/upload-avatar`, `POST`, mEmpty, mForm, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const getAvatar = async () => {
    const rt = await fetchNoBody(`/api/user/auth/avatar`, `GET`, mEmpty, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0].src : null,
        'error': err
    };
}

export const getUserAvatar = async (uname: string) => {
    const mQuery = new Map<string, any>([
        ["uname", uname]
    ])
    const rt = await fetchNoBody(`/api/admin/user/avatar`, `GET`, mQuery, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0].src : null,
        'error': err
    };
}

export const getUserInfo = async (uname: string) => {
    const mQuery = new Map<string, any>([
        ["uname", uname]
    ])
    const rt = await fetchNoBody(`/api/admin/user/info`, `GET`, mQuery, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const getUserFieldValue = async (uname: string) => {
    const mQuery = new Map<string, any>([
        ["uname", uname]
    ])
    const rt = await fetchNoBody(`/api/admin/user/field-value/Name`, `GET`, mQuery, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const getPostID = async (by: string, value: number) => {
    const mQuery = new Map<string, any>([
        ["by", by],
        ["value", value]
    ])
    const rt = await fetchNoBody(`/api/retrieve/batch-id`, `GET`, mQuery, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const getPost = async (id: string) => {
    const mQuery = new Map<string, any>([
        ["id", id]
    ])
    const rt = await fetchNoBody(`/api/retrieve/post`, `GET`, mQuery, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const getTemplate = async () => {
    const rt = await fetchNoBody(`api/submit/template`, "GET", mEmpty, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const postSubmit = async (post: any, followee: string) => {
    const mQuery = new Map<string, any>([
        ["followee", followee],
    ]);
    const rt = await fetchBodyObject(`api/submit/upload`, "POST", mQuery, post, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const getComment = async (followee: string) => {
    const rt = await fetchNoBody(`api/reply/${followee}`, "GET", mEmpty, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const getInteractStatus = async (action: string, id: string) => {
    const rt = await fetchNoBody(`api/interact/${action}/status/${id}`, "GET", mEmpty, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const patchInteractToggle = async (action: string, id: string) => {
    const rt = await fetchNoBody(`api/interact/${action}/toggle/${id}`, "PATCH", mEmpty, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const patchInteractRecord = async (action: string, id: string) => {
    const rt = await fetchNoBody(`api/interact/${action}/record/${id}`, "PATCH", mEmpty, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const patchBookmark = async (id: string) => {
    const rt = await fetchNoBody(`api/bookmark/toggle/${id}`, "PATCH", mEmpty, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const getBookmarkStatus = async (id: string) => {
    const rt = await fetchNoBody(`api/bookmark/status/${id}`, "GET", mEmpty, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const delErasePost = async (id: string) => {
    const rt = await fetchNoBody(`api/manage/erase/${id}`, "DELETE", mEmpty, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}

export const delRemovePost = async (id: string) => {
    const rt = await fetchNoBody(`api/manage/delete/${id}`, "DELETE", mEmpty, loginAuth.value)
    const err = await fetchErr(rt, onExpired)
    return {
        'data': err == null ? (rt as any[])[0] : null,
        'error': err
    };
}