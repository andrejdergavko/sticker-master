import Layout from '~components/common/Layout';
import FileLoadForm from '~components/forms/file-load-form/FileLoadForm';

export default function Home() {
  return (
    <Layout>
      <div>
        <FileLoadForm />
      </div>
    </Layout>
  );
}
