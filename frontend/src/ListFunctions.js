import axios from 'axios'

export const addPersonToList = arg => {
    return axios
        .post(
            '/train/gaindata/newPerson',
            {
                    fullName : arg.fullName,
                    email : arg.email,
                    company: arg.company,
                    department: arg.department,
                    prefix : arg.prefix,
                    phone: arg.phone,
                    notes : arg.notes
            },
            {
                headers: { 'Content-type': 'application/json' }
            }
        )
        .then((response) => {
        console.log(response.status)
            var resp = response.status
            return resp
    })
}

export const addAuditTrialToList = (name, acc) => {
    return axios
        .post(
            '/auditTrial',
            {
                    fullName : name,
                    dateAndTime : new Date().toJSON(),
                    accuracy: acc
            },
            {
                headers: { 'Content-type': 'application/json' }
            }
        )
        .then((response) => {
        console.log(response.status)
            var resp = response.status
            return resp
    })
}

export const getAuditTrialData = () => {
    var data
    return axios
        .get('/auditTrial1', {
            headers: { 'Content-type': 'application/json' }
        })
        .then(response => {
            data = response.data
            return data
            });
}


export const getUserList = () => {
    var list;

    return axios
        .get('/train/gaindata/newPerson1', {
            headers: { 'Content-type': 'application/json' }
        })
        .then( res => {
            list = res.data;
            return list;
            });

}

export const deleteUser = name => {
    axios
        .delete(`/train/gaindata/udpatePerson1/${name}`, {
            headers: { 'Content-type': 'application/json' }
        })
        .then((response) => {
            console.log(response.status)
                var resp = response.status
                return resp
        });
}

export const updateUser = (state, name) => {
    console.log(state)
    console.log(name)
    return axios
        .put(`/train/gaindata/udpatePerson1/${name}`, {
            fullName: state.fullName,
            email: state.email,
            prefix: state.prefix,
            company: state.company,
            phone: state.phone,
            notes: state.notes,
            department: state.department
        }, {
                headers: { 'Content-type': 'application/json' }
            }
        )
        .then((response) => {
            console.log(response)
            var resp = response.status
            return resp
        })
}