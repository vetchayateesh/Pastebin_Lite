import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <div className="mb-8">
                    <div className="mx-auto w-24 h-24 bg-linear-to-br from-slate-100 to-gray-200 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.203-2.47M12 7v.01" />
                        </svg>
                    </div>
                    <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Paste Not Found</h2>
                    <p className="text-gray-600 max-w-md mx-auto">
                        This paste doesn't exist, has expired, or has reached its maximum view limit.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Paste
                    </Link>

                    <div>
                        <Link
                            href="/"
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
