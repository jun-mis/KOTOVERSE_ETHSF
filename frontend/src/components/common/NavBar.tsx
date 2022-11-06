import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import useAuth from '@/context/auth';
import { shortenAddress } from '@/utils/address';
import { SITE_DIRECTORY_PATHS } from '@/utils/constants/links';
import { useLocation } from 'react-router-dom';
import { CATEGORY_OPTIONS } from '@/utils/constants/category';
import { WorldIDWidget } from '@worldcoin/id';

type Props = {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBar = (props: Props) => {
  const { isOpen, onToggle } = useDisclosure();

  const { accountId, connect, disconnect } = useAuth();

  return (
    <Box>
      <Flex
        color={useColorModeValue('white', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}
        bgColor={'none'}
        borderBottom={'1px'}
        borderBottomColor={'blue.800'}
      >
        <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            fontWeight={800}
            color={useColorModeValue('white', 'gray.800')}
            _hover={{ cursor: 'pointer' }}
            onClick={() => window.location.replace('/')}
          >
            {/* SHOULD REPLACE WITH LOGO */}
            Kotoverse
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Box pr={17}>
          <WorldIDWidget
            actionId="wid_BPZsRJANxct2cZxVRyh80SFG" // obtain this from developer.worldcoin.org
            signal="my_signal"
            enableTelemetry
            onSuccess={() => props.setAuth(true)} // pass the proof to the API or your smart contract
            onError={(error) => console.error(error)}
            debug={true} // to aid with debugging, remove in production
          />
        </Box>

        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} alignItems={'center'} direction={'row'} spacing={6}>
          {accountId && <Text>{shortenAddress(accountId)}</Text>}
          {accountId ? (
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bgGradient="linear(to-r, #7928CA, #FF0080)"
              onClick={disconnect}
              _hover={{
                bg: 'pink.300',
              }}
            >
              Disconnect
            </Button>
          ) : (
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bgGradient="linear(to-r, #7928CA, #FF0080)"
              onClick={connect}
              _hover={{
                bg: 'pink.300',
              }}
            >
              Connect
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.400', 'gray.200');
  const linkSelectedColor = useColorModeValue('white', 'gray.600');
  const linkHoverColor = useColorModeValue('pink.400', 'white');
  const popoverContentBgColor = useColorModeValue('#3C3053', 'gray.800');

  const { pathname } = useLocation();

  const isOnCategory = pathname.includes('category');
  console.log('isOnCategory : ', isOnCategory);

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '/'}
                fontSize={'sm'}
                fontWeight={pathname === navItem.href || (isOnCategory && !navItem.href) ? 700 : 500}
                color={pathname === navItem.href || (isOnCategory && !navItem.href) ? linkSelectedColor : linkColor}
                _hover={
                  navItem.href?.includes('category')
                    ? {}
                    : {
                        textDecoration: 'none',
                        color: linkHoverColor,
                      }
                }
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent border={0} boxShadow={'xl'} bg={popoverContentBgColor} p={4} rounded={'xl'} minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={1}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('black.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            color={'whiteAlpha.800'}
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'black'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Recent Updates',
    href: `/${SITE_DIRECTORY_PATHS.RECENT}`,
  },
  {
    label: 'Completed',
    href: `/${SITE_DIRECTORY_PATHS.COMPLETED}`,
  },
  {
    label: 'Category',
    children: CATEGORY_OPTIONS.map((category) => ({
      label: category,
      href: `/category/${category.replace('/', '-')}`, // Including "/" cretes bug as it is recognised as path
    })),
  },
  {
    label: 'Write',
    href: `/${SITE_DIRECTORY_PATHS.CREATE}`,
  },
];

export default NavBar;
