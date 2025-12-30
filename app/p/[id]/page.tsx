import { notFound } from "next/navigation";
import Link from "next/link";

type PasteResponse = {
    content: string;
    remaining_views: number | null;
    expires_at: string | null;
};

async function getPaste(id: string): Promise<PasteResponse> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pastes/${id}`, { cache: "no-store" });
    if (!res.ok) notFound();
    return res.json();
}

export default async function PastePage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    const paste = await getPaste(id);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <Link
                    href="/"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-linear-to-r from-slate-50 to-gray-50 border-b border-gray-200">
                    <h1 className="text-lg font-semibold text-gray-900 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Shared Paste
                    </h1>
                </div>

                <div className="p-6">
                    <pre className="bg-linear-to-br from-slate-900 to-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto font-mono text-sm leading-relaxed whitespace-pre-wrap wrap-break-word border border-slate-700">
                        {paste.content}
                    </pre>

                    {(paste.remaining_views !== null || paste.expires_at) && (
                        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600 bg-gray-50 rounded-lg p-4 border border-gray-200">
                            {paste.remaining_views !== null && (
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <span className="font-medium">{paste.remaining_views} view{paste.remaining_views !== 1 ? 's' : ''} remaining</span>
                                </div>
                            )}
                            {paste.expires_at && (
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-medium">Expires: {new Date(paste.expires_at).toLocaleString()}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
