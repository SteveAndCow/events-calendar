import React, {useEffect} from 'react'
import {useQuery, gql, } from '@apollo/client'
import {LOAD_ALL_EVENTS} from '../GraphQL/Queries'

function GetEvents() {

    const {error, loading, data} = useQuery(LOAD_ALL_EVENTS);
    useEffect(() => {
        console.log(data);
    }, [data])
    return (
        <div>

        </div>
    )
}

export default GetEvents