import React from 'react';
import { useParams } from 'react-router-dom';

export default function CommunityDetail() {
    const { post_pk: id } = useParams();

    return <div>CommunityDetail id: {id}</div>;
}
