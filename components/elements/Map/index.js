import { MapPropTypes } from "@/lib/types";


const Map = ({ path, title }) => (
    <iframe
        title={title}
        src={path}
        width="536"
        height="400"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-base w-full h-[400px]"
    />
);

Map.propTypes = MapPropTypes;


export default Map;