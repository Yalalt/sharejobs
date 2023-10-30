import LayoutProvider from '@/components/LayoutProvider';
import './globals.css';
import '@/stylesheets/commonClasses.css';
import '@/stylesheets/antdOverride.css';
import '@/stylesheets/layout.css';
import '@/stylesheets/loader.css';
import ReduxProvider from '@/components/ReduxProvider';

export const metadata = {
  title: 'ShareJobs',
  description: 'ShareJobs is a job portal for job seekers and recruiters',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </ReduxProvider>
  );
}
