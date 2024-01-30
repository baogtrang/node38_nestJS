const initAvatar = (fullName: string) => {
    let name = fullName.split(" ")
    // console.log(initAvatar);
    // lấy chữ cái đầu của họ ghép với chữ cái đầu của tên => tạo avatar
    let newAvatar = name[0][0] + name[2][0];
    console.log(newAvatar)
    return`https://ui-avatars.com/api/?name=${newAvatar}&background=random&size=100`
}

export {
    initAvatar,
}