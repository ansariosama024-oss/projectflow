import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import Card, { CardBody, CardTitle } from '../ui/Card';

const PagePlaceholder = ({ title, description, icon: Icon = FiClock }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card padding="lg" className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary-50">
          <Icon className="h-7 w-7 text-primary-600" />
        </div>
        <CardTitle className="mb-2">{title}</CardTitle>
        <CardBody className="mx-auto max-w-md">
          {description || 'This module is scaffolded and ready for implementation.'}
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default PagePlaceholder;
