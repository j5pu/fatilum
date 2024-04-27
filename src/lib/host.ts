import { headers } from 'next/headers';
import {ReadonlyHeaders} from "next/dist/server/web/spec-extension/adapters/headers";

export const domain = "mnopi.com"

export type HostProps = {
    domain: string;
    headers: ReadonlyHeaders;
    host: string;
    name: string;
    url: string;
};

export function getHost(): HostProps {
    const headersList = headers();
    const headerHost = headersList.get('host');
    const hostname = headerHost === null ? domain : headerHost;
    const host = hostname.includes("localhost") ? domain : hostname;
    const nameVercel = host.substring(0, host.lastIndexOf("."))
    const name = nameVercel.includes("vercel") ? nameVercel.split(".")[0]: nameVercel

    return {
        domain: domain,
        headers: headersList,
        host: hostname,
        name: name,
        url: "https://" + hostname,
    }
}
