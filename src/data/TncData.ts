export type TncSection = {
    id: number;
    title: string;
    content: string; // HTML dari TinyMCE (tanpa <ol>)
};

export type TncData = {
    title: string;
    description: string;
    sections: TncSection[];
    agreementHtml: string;
};

export const tncData: TncData = {
    title: 'Kunjung Terms & Conditions + Refund Policy',
    description:
        'Before proceeding with your payment, please read and agree to the following terms:',
    sections: [
        {
            id: 1,
            title: 'Transaction Terms',
            content: `
                <p>By continuing with the payment, you confirm that all information you provide is accurate and legitimate.</p>
                <p>Prices, promotions, and availability are based on the most updated information at the time of payment.</p>
                <p>We are not responsible for failed transactions caused by bank or payment gateway issues.</p>
            `,
        },
        {
            id: 2,
            title: 'Refund & Cancellation Policy',
            content: `
                <p>100% refund is available only if cancellation is made no later than H-7.</p>
                <p>50% refund applies if cancellation is made H-3.</p>
                <p>No refund for cancellations under H-3.</p>
                <p>Reschedule is allowed only up to H-7 and subject to availability.</p>
            `,
        },
    ],
    agreementHtml: `
        <p>
            By clicking <strong>“Pay”</strong>, you agree to Kunjung’s
            <strong>Terms & Conditions</strong> and <strong>Refund Policy</strong>.
        </p>
    `,
};
