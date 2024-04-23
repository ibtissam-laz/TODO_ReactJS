import axios from 'axios'

//Users
export const signUp = async(email, pass, username) => {
    try{
    const res = axios.post('http://localhost:8000/users/SignUp', {
        email: email, pass: pass, username: username
    });
    return (await res).data;
    } catch(error) {
        console.error('Invalid email or password');
        throw error;
    }
}
export const getUsers = async() => {
    try{
        const res = await axios.get('users/All');
        return res.data;
    } catch(error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}
export const userLogin = async (user) => {
    try{
        const res = await axios.post('users/Login', user);
        if(res.status === 201){
            console.log(res.data);
            return res.data;
        }   
    }catch(error){
        console.error(error);
    }
}
export const currentUser = async () => {
    const res = await axios.get('users/user');
    return res.data;
}
export const logoutUser = async () => {
    const res = await axios.post('users/Logout');
    return res;
}

// @Post('Logout')
//     async logout(@Res({passthrough: true}) response: Response){
//         if(response.clearCookie('jwt')){
//         return {
//             message: 'success'
//             } 
//         }else {
//             response.status(401).json({
//             message: 'User not connected. Can not log out.'
//         });
//         }
//     }
////////////////////////////////////////////////////
//Notes

export const editContent = async (noteId, user, content) => {
    const res = await axios.patch(`Notes/${noteId}`,{user: user, content: content});
    return res;
}
export const editTitle = async (noteId, user, title) => {
    const res = await axios.patch(`Notes/${noteId}`,{user: user, title: title});
    return res;
}
export const addNote = async (user, title, content) => {
    try{
        const res = await axios.post('Notes/ADD', {user: user, title: title, content: content});
        const note = res.data;
        return note;
    } catch(error) {
        console.error('Error adding a note!')
    }
}
export const deleteNote = async (noteId, user) => {
    try{
        await axios.delete(`Notes/${noteId}`, {user: user});
        console('note deleted successfully')
    } catch(error){
        console.error('Error deleting a note!')
    }
}
export const getNoteById = async (noteId, user) => {
    try{
        const res = await axios.get(`Notes/${noteId}`, {user: user});
        return res.data;
    } catch(error) {
        console.error('Error while getting note!', res.status)
    }
}

////////////////////////////////////////////////
//Tasks
export const addTask = async (user, tache) => {
    try{
        const res = await axios.post('Tasks/ADD', {user: user, tache: tache})
        const task = res.data;
        return task;
    } catch(error) {
        console.error('Error adding a task!')
    }
}
export const deleteTask = async (taskId, user) => {
    try{
        await axios.delete(`Tasks/${taskId}`, {user: user});
        console('task deleted successfully')
    } catch(error){
        console.error('Error deleting a task!')
    }
}
export const editTask = async (taskId, user, tache) => {
    const res = await axios.patch(`Tasks/${taskId}`, {user: user, tache: tache});
    return res;
}
export const doneTask = async (taskId, user, complete) => {
    const res = await axios.patch(`Tasks/${taskId}`, {user: user,done: complete});
    return res;
}
export const taskCategory = async (taskId, category) => {
    const res = await axios.patch(`Tasks/Category/${taskId}`, {category: category});
    return res;
}
// export const getTasks = async (user) => {
//     try{
//         const res = await axios.get('Tasks/mine', {user: user});
//     } catch(error) {}
// }
//////////////////////////////////////////////////////////
//Important dates
export const addDate = async (user, event, impD) => {
    try{
        const res = await axios.post('imp-dates/ADD', {user: user, event: event, impD: impD})
        const imp = res.data;
        return imp;
    } catch(error) {
        console.error('Error adding a event!')
    }
}
export const deleteDate = async (impId, user) => {
    try{
        await axios.delete(`imp-dates/${impId}`, {user: user});
        console('event deleted successfully')
    } catch(error){
        console.error('Error deleting a event!')
    }
}
export const editDate = async (impId, user, impD) => {
    const res = await axios.patch(`imp-dates/${impId}`, {user: user, impD: impD});
    return res;
}
export const editEvent = async (impId, user, event) => {
    const res = await axios.patch(`imp-dates/${impId}`, {user: user, event: event});
    return res;
}

