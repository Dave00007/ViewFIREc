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

export const getAuditTrialList = () => {
    let list = {};

    return axios
        .get('/auditTrial1', {
            headers: { 'Content-type': 'application/json' }
        })
        .then(function (res) {
            list = res.data;
            });
            return list;
}
