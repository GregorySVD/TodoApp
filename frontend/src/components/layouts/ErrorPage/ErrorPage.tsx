import React from 'react';
import './ErrorPage.css'
import {RefreshPageButton} from "../../common/RefreshPageButton/RefreshPageButton";

interface ErrorPageProps {
    error: Error | null;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({error}) => {
    return (
        <div className="ErrorPage__container">
            <h1 className="ErrorPage__title">Loading Error</h1>
            <div className="ErrorPage__container_message">
                <p className="ErrorPage__error_text">Error occurred during loading of this page.</p>
                <p className="ErrorPage__error_support">Please contact <a
                    href="mailto:support@example.com">support@example.com</a> with the link to this page or try agin later. The error message below:</p>
                <li className="ErrorPage__error_message">{error?.message}</li>
            </div>
            <RefreshPageButton/>
        </div>

    );
};
