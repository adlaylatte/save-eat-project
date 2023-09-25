import { SpoqaHanSansNeoFont } from "@/lib/font"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import styled from 'styled-components'
import BackIcon from '@material-design-icons/svg/round/arrow_back_ios_new.svg'
import { Button } from "antd"
import { GithubLogo, GithubLogoText } from "@/components/icon";

const PageContainer = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background-color: #f3f3f3;
	display: flex;
	flex-direction: column;
	max-width: 480px;
	margin: 0 auto;
`

type LayoutProps = {
	header?: ReactNode,
	footer?: ReactNode,
	content?: ReactNode,
}
export function PageLayout(props: LayoutProps) {
	return <PageContainer className={SpoqaHanSansNeoFont.className}>
		{props.header}
		{props.content}
		{props.footer}
	</PageContainer>
}

type HeaderContainerProps = {
	transparent?: boolean
}
const HeaderContainer = styled.div<HeaderContainerProps>`
	height: 48px;
	background-color: ${props => props.transparent ? 'transparent' : 'white'};
	position: relative;
	
	.left {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		padding-left: 4px;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.right {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		padding-right: 4px;

		display: flex;
		align-items: center;
		justify-content: center;
	}
`

type HeaderLayoutProps = {
	transparent?: boolean
	left?: ReactNode,
	title?: ReactNode,
	right?: ReactNode,
}
export function HeaderLayout(props: HeaderLayoutProps) {
	return <HeaderContainer transparent={props.transparent}>
		<div className={'title'}>{props.title}</div>
		<div className={'left'}>{props.left}</div>
		<div className={'right'}>{props.right}</div>
	</HeaderContainer>
}


type NavigationHeaderProps = {
	transparent?: boolean
	title?: ReactNode,
	right?: ReactNode,
}
export function NavigationHeader(props: NavigationHeaderProps) {
	const router = useRouter()

	function navigateBack() {
		router.back()
	}

	return <HeaderLayout
		left={
			<Button
				type="link"
				icon={<BackIcon height={24} width={24} />}
				onClick={navigateBack}
			/>
		}
		{...props}
	/>
}

const FooterLayoutContainer = styled.footer`
  /* position: absolute;
  left: 0;
  bottom: 0; */
  border-top: 1px solid #ddd;
  width: 100%;
  height: 60px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left-box {
	width: 80px;
	background-color: #fff;
  }
  .right-box {
	.github-logo {
		display: flex;
		align-items: center;
		justify-content: center;
	}
  }
`;
export function FooterLayout() {
	return (
		<FooterLayoutContainer>
			<div className="left-box">
				<h1>로고영역</h1>
			</div>
			<div className="right-box">
				<div className="github-logo">
					<GithubLogo width={25} height={25} />
					{/* <Image style={{objectFit:"cover"}} width={33} height={9} src={"/static/img/GitHub_Logo.png"} alt="github-logo" /> */}
					<GithubLogoText width={50} height={35} />
				</div>
			</div>
		</FooterLayoutContainer>
	)
}