import React, { useEffect, useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { Space, Input, Tag, Tooltip, theme } from 'antd'

//state 인터페이스
interface State {
    tags: string[]
    inputVisible: boolean
    inputValue: string
    addVisible: boolean
    inputRef: React.RefObject<InputRef>
    editInputRef: React.RefObject<InputRef>
    newTagName: string
    duplicateTagName: string
}

type Props = {
    onChange(value: string[]): void
}

export function EditableTagComponent(props: Props) {
    const { token } = theme.useToken()

    const [state, setState] = useState<State>({
        tags: [],
        inputVisible: false,
        inputValue: '',
        addVisible: true,
        inputRef: useRef<InputRef>(null),
        editInputRef: useRef<InputRef>(null),
        newTagName: '',
        duplicateTagName: '',
    })

    useEffect(() => {
        if (state.inputVisible) {
            state.inputRef.current?.focus()
        }
    }, [state.inputVisible])

    useEffect(() => {
        state.editInputRef.current?.focus()
    }, [state.inputValue])

    const handleClose = (removedTag: string) => {
        const newTags = state.tags.filter((tag) => tag !== removedTag)
        var addVisible = newTags.length >= 5 ? false : true

        setState({
            ...state,
            tags: newTags,
            addVisible: addVisible,
        })
    }

    //추가 버튼 눌렀을 때 표시되는 Input에 입력한 값 state 저장
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        var len = e.currentTarget.value.length

        if (len <= 10) {
            setState({
                ...state,
                inputValue: e.target.value,
            })
        }
    }

    //입력 완료 이후 포커스해제 및 엔터 입력 시
    const handleInputConfirm = () => {
        var { tags, inputValue, newTagName } = state
        var duplicateItemIndex = tags.indexOf(inputValue)
        var duplicateTagName = ''

        if (state.inputValue && duplicateItemIndex === -1) {
            newTagName = state.inputValue
            tags.push(state.inputValue)
        } else {
            duplicateTagName = state.inputValue
        }

        var addVisible = tags.length >= 5 ? false : true

        props.onChange(tags)

        setState({
            ...state,
            tags: tags,
            addVisible: addVisible,
            newTagName: newTagName,
            duplicateTagName: duplicateTagName,
            inputVisible: false,
            inputValue: '',
        })
    }

    return (
        <Space size={[0, 8]} wrap>
            <Space size={[0, 8]} wrap>
                {state.tags.map((tag, index) => {
                    const tagElem = (
                        <Tag
                            key={tag}
                            closable={true}
                            style={{ userSelect: 'none' }}
                            onClose={() => handleClose(tag)}
                            color={
                                index === state.tags.indexOf(state.duplicateTagName) ? 'red' : ''
                            }
                        >
                            <span>{tag}</span>
                        </Tag>
                    )
                    return tagElem
                })}
            </Space>
            {state.inputVisible ? (
                <Input
                    ref={state.inputRef}
                    type='text'
                    size='small'
                    style={{
                        width: 78,
                        verticalAlign: 'top',
                    }}
                    value={state.inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag
                    style={
                        {
                            background: token.colorBgContainer,
                            borderStyle: 'dashed',
                        } && ({ display: state.addVisible ? undefined : 'none' })
                    }
                    onClick={() => {
                        setState({
                            ...state,
                            inputVisible: true,
                            duplicateTagName: '',
                        })
                    }}
                >
                    <PlusOutlined /> 추가
                </Tag>
            )}
        </Space>
    )
}
