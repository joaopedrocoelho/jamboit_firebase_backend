import {describe, expect, test, jest, beforeAll} from '@jest/globals';
import { getQuizList} from './games.controller';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { verify, JwtPayload } from 'jsonwebtoken';


describe('test getQuizzList',() => {
    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URIS
    );

    const decodedToken =
    verify(process.env.TEST_REFRESH_TOKEN, process.env.CLIENT_SECRET) as JwtPayload;

    oAuth2Client.setCredentials({ refresh_token: decodedToken.refresh_token })

    const mockFormsList = [
        {
          kind: 'drive#file',
          mimeType: 'application/vnd.google-apps.form',
          id: '11kW9lWmTMQSgZ8sW-C0xU_rnkm7QYsQblQVIQJqPWio',
          name: 'Cópia de Quiz test'
        },
        {
          kind: 'drive#file',
          mimeType: 'application/vnd.google-apps.form',
          id: '11mA4x60XfNGHhHWoPKQvz2vNj9FrXwVgmVpcmV2_m_0',
          name: 'Quiz test'
        },
        {
          kind: 'drive#file',
          mimeType: 'application/vnd.google-apps.form',
          id: '1YpN3KGFIMiiIZKRkFQ3I1ekIUnZfBt1ekvitSBIbd1M',
          name: 'Formulário sem título'
        },
        {
          kind: 'drive#file',
          mimeType: 'application/vnd.google-apps.form',
          id: '19ocWYqn1ZMW3GiYFxuDh461UXa88x8EnTDMgdghJdEo',
          name: 'Formulário sem título'
        },
        {
          kind: 'drive#file',
          mimeType: 'application/vnd.google-apps.form',
          id: '1eso3-u28CMVMaHVud4yybpHM4XRHDjeVzcVlSeRXfF4',
          name: 'Analise de Mapa Astral'
        },
        {
          kind: 'drive#file',
          mimeType: 'application/vnd.google-apps.form',
          id: '1UfRO7N7kObR5FCN4AxQ-hcOJrmoUfzrGflvfNIoqJ1o',
          name: 'Analise de Mapa Astral'
        },
        {
          kind: 'drive#file',
          mimeType: 'application/vnd.google-apps.form',
          id: '13S8yWmEvlHT2s3aLfIpNLbe_8vBmsnfIrjRvfAkC580',
          name: 'Briefing'
        }
      ]

    const mockQuizList =[
        {
            "formId": "11kW9lWmTMQSgZ8sW-C0xU_rnkm7QYsQblQVIQJqPWio",
            "info": {
                "title": "Test quiz",
                "documentTitle": "Cópia de Quiz test"
            },
            "settings": {
                "quizSettings": {
                    "isQuiz": true
                }
            },
            "revisionId": "00000001",
            "responderUri": "https://docs.google.com/forms/d/e/1FAIpQLScrOacwFXTYZK3SqyalFk6VsLbJLqbXt8WanDNUD9OpV_Iolg/viewform",
            "items": [
                {
                    "itemId": "49434dbf",
                    "title": "2+2",
                    "questionItem": {
                        "question": {
                            "questionId": "725f1a62",
                            "grading": {
                                "correctAnswers": {
                                    "answers": [
                                        {
                                            "value": "4"
                                        }
                                    ]
                                }
                            },
                            "choiceQuestion": {
                                "type": "RADIO",
                                "options": [
                                    {
                                        "value": "1"
                                    },
                                    {
                                        "value": "2"
                                    },
                                    {
                                        "value": "3"
                                    },
                                    {
                                        "value": "4"
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    "itemId": "1cea7eca",
                    "title": "3+3",
                    "questionItem": {
                        "question": {
                            "questionId": "6b861bea",
                            "grading": {
                                "correctAnswers": {
                                    "answers": [
                                        {
                                            "value": "6"
                                        }
                                    ]
                                }
                            },
                            "choiceQuestion": {
                                "type": "RADIO",
                                "options": [
                                    {
                                        "value": "4"
                                    },
                                    {
                                        "value": "5"
                                    },
                                    {
                                        "value": "6"
                                    },
                                    {
                                        "value": "7"
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    "itemId": "3a22bc11",
                    "title": "9+9",
                    "questionItem": {
                        "question": {
                            "questionId": "331a02e1",
                            "grading": {
                                "correctAnswers": {
                                    "answers": [
                                        {
                                            "value": "18"
                                        }
                                    ]
                                }
                            },
                            "choiceQuestion": {
                                "type": "RADIO",
                                "options": [
                                    {
                                        "value": "10"
                                    },
                                    {
                                        "value": "18"
                                    },
                                    {
                                        "value": "20"
                                    },
                                    {
                                        "value": "22"
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        },
        {
            "formId": "11mA4x60XfNGHhHWoPKQvz2vNj9FrXwVgmVpcmV2_m_0",
            "info": {
                "title": "Test quiz",
                "documentTitle": "Quiz test"
            },
            "settings": {
                "quizSettings": {
                    "isQuiz": true
                }
            },
            "revisionId": "00000029",
            "responderUri": "https://docs.google.com/forms/d/e/1FAIpQLSf28yPlHxQ9QDvTwrpdidnCD8otPu57M0SKi8fbEh03kaHpoA/viewform",
            "items": [
                {
                    "itemId": "49434dbf",
                    "title": "2+2",
                    "questionItem": {
                        "question": {
                            "questionId": "725f1a62",
                            "grading": {
                                "correctAnswers": {
                                    "answers": [
                                        {
                                            "value": "4"
                                        }
                                    ]
                                }
                            },
                            "choiceQuestion": {
                                "type": "RADIO",
                                "options": [
                                    {
                                        "value": "1"
                                    },
                                    {
                                        "value": "2"
                                    },
                                    {
                                        "value": "3"
                                    },
                                    {
                                        "value": "4"
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    "itemId": "1cea7eca",
                    "title": "3+3",
                    "questionItem": {
                        "question": {
                            "questionId": "6b861bea",
                            "grading": {
                                "correctAnswers": {
                                    "answers": [
                                        {
                                            "value": "6"
                                        }
                                    ]
                                }
                            },
                            "choiceQuestion": {
                                "type": "RADIO",
                                "options": [
                                    {
                                        "value": "4"
                                    },
                                    {
                                        "value": "5"
                                    },
                                    {
                                        "value": "6"
                                    },
                                    {
                                        "value": "7"
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    "itemId": "3a22bc11",
                    "title": "9+9",
                    "questionItem": {
                        "question": {
                            "questionId": "331a02e1",
                            "grading": {
                                "correctAnswers": {
                                    "answers": [
                                        {
                                            "value": "18"
                                        }
                                    ]
                                }
                            },
                            "choiceQuestion": {
                                "type": "RADIO",
                                "options": [
                                    {
                                        "value": "10"
                                    },
                                    {
                                        "value": "18"
                                    },
                                    {
                                        "value": "20"
                                    },
                                    {
                                        "value": "22"
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        },
        {
            "formId": "1YpN3KGFIMiiIZKRkFQ3I1ekIUnZfBt1ekvitSBIbd1M",
            "info": {
                "documentTitle": "Formulário sem título"
            },
            "settings": {
                "quizSettings": {
                    "isQuiz": true
                }
            },
            "revisionId": "00000002",
            "responderUri": "https://docs.google.com/forms/d/e/1FAIpQLSdhtwufefX8d4UgkThMRZw5z0VY0hVeZ_lNXlH8uuLWG7NESA/viewform",
            "items": [
                {
                    "itemId": "57ea85da",
                    "title": "Pergunta sem título",
                    "questionItem": {
                        "question": {
                            "questionId": "3f267391",
                            "choiceQuestion": {
                                "type": "RADIO",
                                "options": [
                                    {
                                        "value": "Opção 1"
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        }
    ]

    const { forms } = google.forms({ version: 'v1', auth: oAuth2Client });


    jest.setTimeout(30000);

    test('test getQuizzList', async () => {
        const quizList = await getQuizList(mockFormsList, forms);

        expect(quizList).toEqual(mockQuizList);
    })

    test('returns [] for empty array', async () => {
        const quizList = await getQuizList([], forms);

        expect(quizList).toEqual([]);
    })
/*     test('test getQuizzList', async () => {
        const quizList = await getQuizList(mockFormsList, forms);

        expect(quizList).toEqual(mockQuizList);
    }) */
})