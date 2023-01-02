export default class APIService{
    static async UpdateProject(id, body){
        const resp = await fetch(`http://127.0.0.1:5000/update/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        return await resp.json()
    }

    static DeleteProject(id){
        return fetch(`http://127.0.0.1:5000/delete/${id}/`, {
            method:'DELETE',
            headers: {
                'Content-Type':'application/json'
            }
        })
    }

}
