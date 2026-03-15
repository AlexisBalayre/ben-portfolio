import Timeline from './Timeline';

// TimelineDark is an alias for Timeline using the "experiences" translation prefix.
const TimelineDark = ({ items }: { items: { id: string; logo: string; period: string }[] }) => (
    <Timeline items={items} translationPrefix="experiences" />
);

export default TimelineDark;
