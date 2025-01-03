export const theme = {
    colors: {
        // Primary brand colors - used sparingly for important actions
        primary: {
            yellow: '#fed700',
            green: '#32cd33',
        },
        // Neutral colors - used often
        neutral: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
        },
        // Semantic colors
        semantic: {
            success: '#32cd33',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6',
        }
    },
    fontFamily: {
        gotham: ['Gotham Rounded', 'sans-serif'],
    },
    spacing: {
        container: '1120px',
        gutter: {
            mobile: '16px',
            desktop: '24px',
        }
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        full: '9999px',
    }
};