import React from 'react';
import {
    Avatar,
    Bio,
    Container,
    Name,
    Header,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author,
} from './styles';

import api from '../../services/api';

const User = (props) => {
    const { navigation } = props
    const { route } = props
    const user = route.params.user
    const nameUser = user ? user.name : "User"

    const [stars, setStars] = React.useState([])

    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: nameUser });
    }, [navigation, route]);

    React.useEffect(() => {
        getFavorteRepository()
    }, [])

    const getFavorteRepository = async () => {
        const response = await api.get(`/users/${user.login}/starred`)

        setStars(response.data);
        console.tron.log(stars)
    }

    return (
        <Container>
            <Header>
                <Avatar source={{ uri: user.avatar }} />
                <Name>{user.name}</Name>
                <Bio>{user.bio}</Bio>
            </Header>

            <Stars
                data={stars}
                keyExtractor={stars => `${stars.id}`}
                renderItem={({ item }) => {
                    return (
                        <Starred>
                            <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                            <Info>
                                <Title>{item.name}</Title>
                                <Author>{item.owner.login}</Author>
                            </Info>
                        </Starred>
                    )
                }}
            />
        </Container>
    )
};

export default User;
