
export const VegaLiteInteractiveDataTypesToMark: Record<
	string,
	Array<{ mark: unknown, encoding?: Record<string, unknown>, params?: Array<unknown> }>
> = {
	"|": [],
	// 1x
	"nominal|": [
		{
			mark: "text",
		},
	],
	"|nominal": [
		{
			mark: "text",
			
		},
	],
	"ordinal|": [
		{
			mark: "text",
		},
	],
	"|ordinal": [
		{
			mark: "text",
			
		},
	],
	"temporal|": [
		{
			mark: "text",
		},
	],
	"|temporal": [
		{
			mark: "text",
			
		},
	],
	"quantitative|": [
		{
			mark: {
				type: "point",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "grid",
					select: "interval",
					bind: "scales"
				},
				{
					name: "paintbrush",
					select: {
						type: "point",
						on: "pointerover",
						nearest: true
					}
				}
			],
			encoding: {
				size: {
					condition: {
						param: "paintbrush",
						value: 300
					},
					value: 30
				}
			}
		}
	],
	"|quantitative": [
		{
			mark: {
				type: "point",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "grid",
					select: "interval",
					bind: "scales"
				},
				{
					name: "paintbrush",
					select: {
						type: "point",
						on: "pointerover",
						nearest: true
					}
				}
			],
			encoding: {
				size: {
					condition: {
						param: "paintbrush",
						value: 300
					},
					value: 30
				}
			}
		}
	],
	"f_quantitative|": [
		{
			mark: {
				type: "bar",
				stroke: "black",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}
			],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.3
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 2
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],
	"|f_quantitative": [
		{
			mark: {
				type: "bar",
				stroke: "black",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}
			],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.3
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 2
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],

	// 2x
	// x: nominal
	"nominal|nominal": [
		{
			mark: {
				type: "rect",
				cursor: "pointer",
				stroke: "black",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.3
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 2
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],
	"nominal|ordinal": [
		{
			mark: {
				type: "rect",
				cursor: "pointer",
				stroke: "black",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.3
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 2
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],
	"nominal|temporal": [
		{
			mark: {
				type: "rect",
				cursor: "pointer",
				stroke: "black",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.3
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 2
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],
	"nominal|quantitative": [
		{
			mark: {
				type: "tick",
				cursor: "pointer",
				tooltip: true
			},
			params: [{
				name: "grid",
				select: "interval",
				bind: "scales"
			}]
		},
	],
	"nominal|f_quantitative": [
		{
			mark: {
				type: "bar",
				stroke: "black",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}
			],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.3
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 2
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],

	// x: ordinal
	"ordinal|nominal": [
		{
			mark: {
				type: "rect",
				stroke: "black",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}
			],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.1
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 3
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],
	"ordinal|ordinal": [
		{
			mark: {
				type: "rect",
				stroke: "black",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}
			],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.1
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 3
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],
	"ordinal|temporal": [
		{
			mark: {
				type: "rect",
				stroke: "black",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}
			],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.1
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 3
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],
	"ordinal|quantitative": [
		{
			mark: {
				type: "tick",
				cursor: "pointer",
				tooltip: true
			},
			params: [{
				name: "grid",
				select: "interval",
				bind: "scales"
			}]
		},
	],
	"ordinal|f_quantitative": [
		{
			mark: {
				type: "bar",
				stroke: "black",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}
			],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.3
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 2
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],

	// x: temporal
	"temporal|nominal": [
		{
			mark: {
				type: "rect",
				cursor: "pointer",
				stroke: "black",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.3
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 2
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],
	"temporal|ordinal": [
		{
			mark: {
				type: "rect",
				cursor: "pointer",
				stroke: "black",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.3
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 2
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],
	"temporal|temporal": [
		{
			mark: {
				type: "rect",
				cursor: "pointer",
				stroke: "black",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.3
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 2
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],
	"temporal|quantitative": [
		{
			mark: {
				type: "tick",
				cursor: "pointer",
				tooltip: true
			},
			params: [{
				name: "grid",
				select: "interval",
				bind: "scales"
			}]
		},
	],
	"temporal|f_quantitative": [
		{
			mark: {
				type: "line",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "grid",
					select: "interval",
					bind: "scales"
				}
			],
		},
	],

	// x: quantitative
	"quantitative|nominal": [
		{
			mark: {
				type: "point",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "grid",
					select: "interval",
					bind: "scales"
				},
				{
					name: "paintbrush",
					select: {
						type: "point",
						on: "pointerover",
						nearest: true
					}
				}
			],
			encoding: {
				size: {
					condition: {
						param: "paintbrush",
						value: 300
					},
					value: 30
				}
			}
		}
	],
	"f_quantitative|nominal": [
		{
			mark: {
				type: "bar",
				stroke: "black",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}
			],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.3
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 2
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],
	"quantitative|ordinal": [
		{
			mark: {
				type: "tick",
				cursor: "pointer",
				tooltip: true
			},
			params: [{
				name: "grid",
				select: "interval",
				bind: "scales"
			}]
		},
	],
	"f_quantitative|ordinal": [
		{
			mark: {
				type: "bar",
				stroke: "black",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}
			],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.3
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 2
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],
	"quantitative|temporal": [
		{
			mark: {
				type: "line",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "grid",
					select: "interval",
					bind: "scales"
				}
			],
		},
	],
	"f_quantitative|temporal": [
		{
			mark: {
				type: "point",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "grid",
					select: "interval",
					bind: "scales"
				},
				{
					name: "paintbrush",
					select: {
						type: "point",
						on: "pointerover",
						nearest: true
					}
				}
			],
			encoding: {
				size: {
					condition: {
						param: "paintbrush",
						value: 300
					},
					value: 30
				}
			}
		}
	],
	"quantitative|quantitative": [
		{
			mark: {
				type: "point",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "grid",
					select: {
						
					toogle: "event.altKey",
					},
					bind: "scales"
				},
				{
					name: "brush",
					select: "interval"
				}
			],
			encoding: {
				color: {
					condition: { "param": "brush", "type": "ordinal" },
					"value": "grey"
				}
			}
		},
	],
	"f_quantitative|quantitative": [
		{
			mark: {
				type: "bar",
				stroke: "black",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}
			],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.3
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 2
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],
	"quantitative|f_quantitative": [
		{
			mark: {
				type: "bar",
				stroke: "black",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "highlight",
					select: {
						type: "point",
						on: "pointerover",
						clear: "pointerout"
					}
				},
				{
					name: "select",
					select: "point"
				}
			],
			encoding: {
				fillOpacity: {
					condition: { param: "select", value: 1 },
					value: 0.3
				},
				strokeWidth: {
					condition: [
						{
							param: "select",
							empty: false,
							value: 2
						},
						{
							param: "highlight",
							empty: false,
							value: 1
						}
					],
					value: 0
				}
			}
		},
	],
	"f_quantitative|f_quantitative": [
		{
			mark: {
				type: "point",
				cursor: "pointer",
				tooltip: true
			},
			params: [
				{
					name: "grid",
					select: "interval",
					bind: "scales"
				},
				{
					name: "paintbrush",
					select: {
						type: "point",
						on: "pointerover",
						nearest: true
					}
				}
			],
			encoding: {
				size: {
					condition: {
						param: "paintbrush",
						value: 300
					},
					value: 30
				}
			}
		}
	],
};
