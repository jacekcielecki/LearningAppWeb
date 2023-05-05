import React, { ReactNode } from "react";

type SectionProps = {
    title?: string,
    children: ReactNode
}

export const Section = ( { children, title="My default Section" } : SectionProps ) => {
    return ( 
    <div>{title}</div> 
    );
}