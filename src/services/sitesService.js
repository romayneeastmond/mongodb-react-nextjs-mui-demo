const sitesService = () => {
    const add = async (site) => {
        const res = await fetch('api/sites/add', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(site)
        })

        if (!res.ok) {
            return { error: 'Site not added successfully.' }
        }

        const data = await res.json()

        return data
    }

    const remove = async (id) => {
        const res = await fetch(`api/sites/delete?id=${encodeURIComponent(id)}`, {
            method: 'DELETE'
        })

        if (!res.ok) {
            return { error: 'Site not deleted successfully.' }
        }

        const data = await res.json()

        return data
    }

    const get = async (id) => {
        const res = await fetch(`api/sites/get?id=${encodeURIComponent(id)}`)

        if (!res.ok) {
            return { error: 'Site not found.' }
        }

        const data = await res.json()

        return data
    }

    const list = async () => {
        const res = await fetch('api/sites/list')

        if (!res.ok) {
            return { error: 'Sites not loaded successfully.' }
        }

        const data = await res.json()

        return data
    }

    const update = async (id, site) => {
        const res = await fetch(`api/sites/update?id=${encodeURIComponent(id)}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(site)
        })

        if (!res.ok) {
            return { error: 'Site not updated successfully.' }
        }

        const data = await res.json()

        return data
    }

    return {
        add,
        get,
        list,
        remove,
        update
    }
}

export default sitesService