import Skeleton from 'react-loading-skeleton';

export const Loading = () => {
    return (
        <div style={{ padding: '20px' }}>
            Cargando... <Skeleton count={5} />
        </div>
    );
};

