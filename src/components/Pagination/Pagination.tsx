

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {

    const renderPages = () => {
        const pages = [];
        const totalPagesToShow = 5;

        if (totalPages <= totalPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <li className={`page-item ${i === currentPage ? "active" : ""}`} key={i}>
                        <button className="page-link" onClick={() => onPageChange(i)}>
                            {i}
                        </button>
                    </li>
                );
            }
        } else {
            let start = currentPage - Math.floor(totalPagesToShow / 2);
            let end = currentPage + Math.floor(totalPagesToShow / 2);
            if (start < 1) {
                start = 1;
                end = start + totalPagesToShow - 1;
            }
            if (end > totalPages) {
                end = totalPages;
                start = end - totalPagesToShow + 1;
            }
            if (start > 1) {
                pages.push(
                    <li className="page-item" key="1">
                        <button className="page-link" onClick={() => onPageChange(1)}>
                            1
                        </button>
                    </li>
                );
                if (start > 2) {
                    pages.push(
                        <li className="page-item disabled" key="start">
                            <span className="page-link">...</span>
                        </li>
                    );
                }
            }
            for (let i = start; i <= end; i++) {
                pages.push(
                    <li className={`page-item ${i === currentPage ? "active" : ""}`} key={i}>
                        <button className="page-link" onClick={() => onPageChange(i)}>
                            {i}
                        </button>
                    </li>
                );
            }
            if (end < totalPages) {
                if (end < totalPages - 1) {
                    pages.push(
                        <li className="page-item disabled" key="end">
                            <span className="page-link">...</span>
                        </li>
                    );
                }
                pages.push(
                    <li className="page-item" key={totalPages}>
                        <button className="page-link" onClick={() => onPageChange(totalPages)}>
                            {totalPages}
                        </button>
                    </li>
                );
            }
        }
        return pages;
    };

    return (
        <div>
            <nav>
                <ul className="pagination justify-content-center">
                    {renderPages()}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination