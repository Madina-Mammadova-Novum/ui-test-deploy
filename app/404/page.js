import React from 'react';

import { PageLayout } from "@/layouts";
import { NotFound } from "@/modules";

export const metadata = {
    title: 'Page Not Found',
};

export default function PageNotFound() {
    return <PageLayout>
        <NotFound/>
    </PageLayout>;
}
