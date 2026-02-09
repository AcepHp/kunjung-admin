export type TncData = {
    transactionTerms: string;
    refundCancellationPolicy: string;
    agreementText: string;
};

export const tncData: TncData = {
    transactionTerms: "By making a transaction on this platform, users agree that all information provided is accurate and complete. Payments must be completed using the available payment methods within the specified time limit. Failure to complete payment may result in automatic cancellation of the transaction.",
    refundCancellationPolicy: "Cancellations and refunds are subject to the terms and conditions applicable to each product or service. Refund requests must be submitted within the specified period and must meet the applicable requirements. Administrative fees or third-party charges that have already been incurred are non-refundable.",
    agreementText: "By agreeing to these terms and conditions, users confirm that they have read, understood, and agreed to all applicable policies. The platform reserves the right to modify or update these terms at any time without prior notice."
};
