import Link from 'next/link';

interface PlayButtonsProps {
  videoId: string;
  playLinks: {
    id: string;
    name: string;
    url: string;
    openInNewTab: boolean;
  }[];
}

const PlayButtons: React.FC<PlayButtonsProps> = ({ videoId, playLinks }) => {
  return (
    <div className="ml-2 mt-8 space-x-4">
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        <Link href={`/player/${videoId}`}>立即播放</Link>
      </button>
      {playLinks.map((link) => (
        <button
          key={link.id}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          <Link
            href={link.url}
            target={link.openInNewTab ? '_blank' : '_self'}
            rel={link.openInNewTab ? 'noopener noreferrer' : ''}
          >
            {link.name}
          </Link>
        </button>
      ))}
    </div>
  );
};

export default PlayButtons;