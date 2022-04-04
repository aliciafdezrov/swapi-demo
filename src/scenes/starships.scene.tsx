import React from 'react';
import {MainLayout} from "../layouts/main.layout";
import {StarshipsContainer} from "../pods/starships/starships.container";

export const StarshipsScene: React.FC = () => {
    return (
        <MainLayout>
            <StarshipsContainer/>
        </MainLayout>
    );
};
