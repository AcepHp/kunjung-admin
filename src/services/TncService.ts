import axios from "@/libs/axios";

export interface TncPayload {
    id?: string;
    transactionTerms: string;
    refundCancellationPolicy: string;
    agreementText: string;
}

export interface TncResponse {
    message: string;
    data: TncPayload;
}

export const getTnc = async (): Promise<TncPayload> => {
    const response = await axios.get<TncResponse>('/tnc-policies');
    return response.data.data;
};

export const createTnc = async (payload: TncPayload): Promise<TncPayload> => {
    console.log(`Creating T&C: /tnc-policies`, payload);
    const response = await axios.post<TncResponse>(`/tnc-policies`, {
        transactionTerms: payload.transactionTerms,
        refundCancellationPolicy: payload.refundCancellationPolicy,
        agreementText: payload.agreementText,
    });
    return response.data.data;
};

export const updateTnc = async (payload: TncPayload): Promise<void> => {
    console.log(`Updating T&C: /tnc-policies`, payload);
    await axios.patch(`/tnc-policies`, {
        transactionTerms: payload.transactionTerms,
        refundCancellationPolicy: payload.refundCancellationPolicy,
        agreementText: payload.agreementText,
    });
};
