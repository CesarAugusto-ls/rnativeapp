import React from 'react';
import { View } from 'react-native';

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

        setStars([response.data]);
    }

    return (
        <View>

        </View>
    )
};

export default User;
