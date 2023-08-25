import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    container: 'text-center h-40 p-2 border-2 rounded-lg flex flex-col cursor-pointer',
  },
  variants: {
    race: {
      human: {
        container: 'border-sky-400',
      },
      elf: {
        container: 'border-emerald-400',
      },
      goblin: {
        container: 'border-red-400',
      },
      undead: {
        container: 'border-gray-400',
      },
    },
    selectedRace: {
      human: {
        container: 'bg-sky-600/25',
      },
      elf: {
        container: 'bg-emerald-600/25',
      },
      goblin: {
        container: 'bg-red-600/25',
      },
      undead: {
        container: 'bg-gray-600/75',
      },
    }
  }
});

export interface RaceCardProps {
  name: string;
  race: 'human' | 'elf' | 'goblin' | 'undead';
  selectedRace?: 'human' | 'elf' | 'goblin' | 'undead';
  icon: () => JSX.Element;
  bonusText: string;
}
export default function RaceCard(props: RaceCardProps) {
  const { container } = styles({ race: props.race, selectedRace: props.selectedRace });
  return (
    <div className={container()}>
      <div className='grow flex flex-col justify-center items-center'>
        {props.icon()}
      </div>
      <h3 className='font-bold'>{props.name}</h3>
      <p className='text-sm text-gray-400'>{props.bonusText}</p>
    </div>
  );
}